import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import MUICard from '@material-ui/core/Card'
import CircularProgress from '@material-ui/core/CircularProgress'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import defaultImg from '../assets/images/gatsby-icon.png'
import { useFirebase } from './Firebase'
import { dashPath } from '../lib/utils'
import { showSnack } from '../lib/state'

const Wrapper = styled.div`
  .card {
    max-width: 400px;
    text-align: initial;
  }
  .status-online {
    background: green;
  }
  .status-waiting {
    background: orange;
  }
  .status-error {
    background: red;
  }
  .media {
    height: 0;
    padding-top: 56.25%;
    cursor: pointer;
  }
  .actions {
    .loved {
      color: ${props => props.theme.loved};
    }
  }
`

let diagAction

function Card ({ userId, store, showContent, hideFavIcon, hideShareIcon }) {
  const [isOwn] = useState(store.author === userId)
  const [status, setStatus] = useState('(Non publiée)')
  const [loading] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [diagOpen, setDiagOpen] = useState(false)
  const [diagTitle, setDiagTitle] = useState('')
  const [diagText, setDiagText] = useState('')

  const firebase = useFirebase()

  useEffect(() => {
    if (isOwn) {
      if (store.status === 'online') setStatus('(En ligne)')
      if (store.status === 'waiting') setStatus('(En attente)')
      else if (store.status === 'error') setStatus('(En erreur)')
    }
  }, [isOwn, store.status])

  const openDiag = (title, text, action) => {
    setAnchorEl(null)
    setDiagOpen(true)
    setDiagTitle(title)
    setDiagText(text)
    diagAction = () =>
      action(
        store.id,
        successMsg => {
          showSnack(successMsg, 'success')
          navigate(dashPath)
        },
        failMsg => {
          showSnack(failMsg, 'error')
        }
      )
  }

  const openRemoveDiag = () => {
    openDiag(
      `Suppression de "${store.name}"`,
      'Voulez-vous vraiment supprimer cette vitrine ?',
      firebase.deleteStore
    )
  }

  const openPublishDiag = () => {
    openDiag(
      `Mise en ligne de "${store.name}"`,
      'Voulez-vous vraiment publier cette vitrine (elle sera placée en attente de validation) ?',
      firebase.publishStore
    )
  }

  const Diag = () => (
    <Dialog
      aria-labelledby='responsive-dialog-title'
      onClose={() => setDiagOpen(false)}
      open={diagOpen}
    >
      <DialogTitle id='responsive-dialog-title'>{diagTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{diagText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDiagOpen(false)} variant='contained'>
          {'Annuler'}
        </Button>
        <Button
          onClick={() => {
            setDiagOpen(false)
            diagAction()
          }}
        >
          {'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  )

  const setInFavCallback = () => {
    if (store.loved) {
      store.loved = false
      showSnack("Vous n'aimez plus cette vitrine ?", 'success')
    } else {
      store.loved = true
      showSnack('La vitrine a été ajoutée à vos favoris !', 'success')
    }
  }

  const addRemoveToFav = () => {
    firebase.addRemoveStoreFav(
      store.id,
      userId,
      setInFavCallback,
      () => showSnack("Une erreur interne s'est produite.", 'error'),
      store.loved
    )
  }

  const share = () => {
    console.log('SHARE')
  }

  return (
    <Wrapper>
      <MUICard className='card'>
        {/* HEADER */}
        <CardHeader
          action={
            <IconButton
              aria-haspopup='true'
              aria-label='More'
              aria-owns={anchorEl ? 'card-menu' : null}
              onClick={e => setAnchorEl(e.currentTarget)}
            >
              <MoreVertIcon />
            </IconButton>
          }
          avatar={
            loading ? (
              <CircularProgress className='progress' />
            ) : (
              <Avatar aria-label='Store' className={`status-${store.status}`}>
                {store.name.substring(0, 1)}
              </Avatar>
            )
          }
          subheader={status}
          title={store.name}
        />
        {/* MEDIA */}
        <CardMedia
          className='media'
          image={store.photos.length ? store.photos[0].src : defaultImg}
          onClick={() => navigate(`/store/${store.id}`)}
          title='Voir vitrine'
        />
        {/* CONTENT */}
        {showContent && (
          <CardContent>
            <Typography component='p'>{store.description}</Typography>
          </CardContent>
        )}
        {/* ACTIONS */}
        <CardActions className='actions' disableSpacing>
          {!hideFavIcon && (
            <IconButton
              aria-label={
                store.loved ? 'Vitrine dans vos favoris' : 'Ajouter aux favoris'
              }
              onClick={addRemoveToFav}
              title={
                store.loved ? 'Vitrine dans vos favoris' : 'Ajouter aux favoris'
              }
            >
              <FavoriteIcon className={store.loved ? 'loved' : ''} />
            </IconButton>
          )}
          {!hideShareIcon && (
            <IconButton
              aria-label='Partager la vitrine sur les réseaux sociaux'
              onClick={share}
              title='Partager la vitrine sur les réseaux sociaux'
            >
              <ShareIcon />
            </IconButton>
          )}
        </CardActions>
        {/* MENU */}
        <Menu
          anchorEl={anchorEl}
          className='menu'
          id='card-menu'
          onClose={() => setAnchorEl(null)}
          open={Boolean(anchorEl)}
          PaperProps={{ style: { maxHeight: 48 * 4.5, width: 200 } }}
        >
          <MenuItem onClick={() => navigate(`/store/${store.id}`)}>
            {'Voir vitrine'}
          </MenuItem>
          {isOwn && (
            <div>
              <Divider />
              <MenuItem onClick={() => navigate(`/store/${store.id}/edit`)}>
                {'Modifier'}
              </MenuItem>
              <MenuItem onClick={openRemoveDiag}>{'Supprimer'}</MenuItem>
              {!['online', 'waiting'].includes(store.status) && (
                <div>
                  <Divider />
                  <MenuItem onClick={openPublishDiag}>{'Publier'}</MenuItem>
                </div>
              )}
            </div>
          )}
        </Menu>
        <Diag />
      </MUICard>
    </Wrapper>
  )
}

Card.propTypes = {
  userId: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
  showContent: PropTypes.bool,
  hideFavIcon: PropTypes.bool,
  hideShareIcon: PropTypes.bool
}

export default Card
