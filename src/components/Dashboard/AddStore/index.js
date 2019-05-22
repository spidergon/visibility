import React, { useState, useReducer } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Seo from '../../Seo'
import Content from './Content'
import { setTabVal, showSnack } from '../../../lib/state'
import { slugify } from '../../../lib/utils'
import { addStore, storeExists } from '../../../lib/base'

const Wrapper = styled.div`
  .mobile {
    display: none;
    .content {
      margin: 0 1rem;
    }
  }
  .action {
    padding: calc(${props => props.theme.spacingUnit} * 3);
    text-align: center;
    .button {
      margin-top: ${props => props.theme.spacingUnit};
      margin-right: ${props => props.theme.spacingUnit};
    }
  }
  @media (max-width: ${props => props.theme.sm}) {
    h2 {
      font-size: 1.5em;
    }
    .desktop {
      display: none;
    }
    .mobile {
      display: block;
    }
  }
`

const stepTitles = [
  'Informations générales',
  'Description',
  'Photos',
  'Géolocalisation'
]

function stepReducer (step, action) {
  switch (action) {
    case 'reset':
      return 0
    case 'next':
      return step + 1
    case 'prev':
      return step - 1
    default:
      throw new Error(`invalid action: ${action}`)
  }
}

function AddStore () {
  const [step, dispatch] = useReducer(stepReducer, 1)
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('Ma Vitrine')
  const [activity, setActivity] = useState('Hôtels, Restaurants')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState(['Restaurant', 'Wifi', 'Famille', 'Bar'])
  const [company, setCompany] = useState('CS Digital')
  const [siret, setSiret] = useState('522 948 256')
  const [photos, setPhotos] = useState([])
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState([0, 0])

  // useEffect(() => {
  //   function unloadHandler (e) {
  //     e.preventDefault()
  //     return (e.returnValue =
  //       'Voulez-vous vraiment quitter ? Les modifications que vous avez apportées ne seront peut-être pas enregistrées.')
  //   }
  //   window.addEventListener('beforeunload', unloadHandler)
  //   return () => {
  //     console.log('unMount')
  //     window.removeEventListener('beforeunload', unloadHandler)
  //   }
  // }, [])

  const content = index => {
    return (
      <Content
        data={{
          info: {
            name,
            setName,
            activity,
            setActivity,
            tags,
            setTags,
            company,
            setCompany,
            siret,
            setSiret
          },
          description: {
            description,
            setDescription
          },
          photos: {
            photos,
            setPhotos
          },
          geoloc: {
            address,
            setAddress,
            coordinates,
            setCoordinates
          }
        }}
        dispatch={dispatch}
        step={index}
      />
    )
  }

  const handleCreate = async () => {
    if (name && description) {
      setLoading(true)
      const slug = slugify(name)
      if (!(await storeExists(slug))) {
        addStore({
          slug,
          name,
          activity,
          description,
          tags,
          company,
          siret,
          photos,
          address,
          coordinates
        })
          .then(() => setTabVal(0)) //  then, go to tap #0 (Mes Vitrines)
          .catch(err => {
            console.log(err)
            showSnack("Une erreur interne s'est produite.", 'error')
          })
      } else {
        setLoading(false)
        dispatch('reset')
        showSnack(
          `Impossible de créer "${name}" ! Une vitrine portant ce nom existe déjà.`,
          'error'
        )
      }
    }
  }

  return (
    <Wrapper>
      <Seo title='Nouvelle Vitrine' />
      <Helmet>
        <link
          crossOrigin=''
          href='https://unpkg.com/leaflet@1.4.0/dist/leaflet.css'
          integrity='sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=='
          rel='stylesheet'
        />
      </Helmet>
      <center>
        {!loading ? (
          <h2>{name || 'Nouvelle Vitrine'}</h2>
        ) : (
          <CircularProgress />
        )}
      </center>
      <div className='desktop'>
        <Stepper activeStep={step} orientation='vertical'>
          {stepTitles.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>{content(index)}</StepContent>
              </Step>
            )
          })}
        </Stepper>
      </div>
      <div className='mobile'>
        <Stepper activeStep={step} alternativeLabel>
          {stepTitles.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        {step < stepTitles.length && (
          <div className='content'>{content(step)}</div>
        )}
      </div>
      {/* Actions */}
      {step === stepTitles.length && (
        <Paper className='action' elevation={0} square>
          <Typography>{'Votre vitrine est complète !'}</Typography>
          <Button
            className='button'
            disabled={loading}
            onClick={() => dispatch('reset')}
          >
            {'Corriger'}
          </Button>
          <Button
            className='button'
            color='primary'
            disabled={loading}
            onClick={handleCreate}
            variant='contained'
          >
            {'Créer'}
          </Button>
        </Paper>
      )}
    </Wrapper>
  )
}

export default AddStore
