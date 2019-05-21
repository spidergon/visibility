import React from 'react'
import styled from 'styled-components'
import Link from '../Link'
import Hero from './Hero'
import { dashPath } from '../../lib/utils'

const Wrapper = styled.div``

const Home = () => (
  <Wrapper>
    <Hero />
    <section className='lorem'>
      <div className='inner wrap'>
        <Link to={'/connexion'}>{'Connexion'}</Link>
        {' | '}
        <Link to={dashPath}>{'Dashboard'}</Link>
        {' | '}
        <Link to={'/store/le-bon-resto'}>{'Le Bon Resto'}</Link>

        <h1>{'Can I use the gun?'}</h1>
        <p>{`
          Bender, hurry! This fuel's expensive! Also, we're dying! She also
          liked to shut up! It doesn't look so shiny to me. Ugh, it's filthy!
          Why not create a National Endowment for Strip Clubs while we're at it?
        `}</p>
        <p>{`
          We're rescuing ya. I've got to find a way to escape the horrible
          ravages of youth.{' '}
          <strong>
            {' '}
            Suddenly, I'm going to the bathroom like clockwork, every three
            hours.
          </strong>{' '}
          <em>
            {' '}
            And those jerks at Social Security stopped sending me checks.
          </em>{' '}
          Now 'I'' have to pay ''them'!
        ̀`}</p>
        <h2>{'Really?!'}</h2>
        <p>{`
          You, a bobsleder!? That I'd like to see! I'm Santa Claus! Of all the
          friends I've had… you're the first. I love you, buddy! You mean while
          I'm sleeping in it?
        ̀`}</p>
        <ol>
          <li>
            {`Wow, you got that off the Internet? In my day, the Internet was only
            used to download pornography.`}
          </li>
          <li>{`Doomsday device? Ah, now the ball's in Farnsworth's court!`}</li>
          <li>
            {`OK, this has gotta stop. I'm going to remind Fry of his humanity the
            way only a woman can.`}
          </li>
        </ol>

        <h3>{`Daddy Bender, we're hungry.`}</h3>
        <p>{`
          And from now on you're all named Bender Jr. Dr. Zoidberg, that doesn't
          make sense. But, okay! Um, is this the boring, peaceful kind of taking
          to the streets? Yeah, lots of people did.
        ̀`}</p>
        <ul>
          <li>
            {`Bender, being God isn't easy. If you do too much, people get
            dependent on you, and if you do nothing, they lose hope. You have to
            use a light touch. Like a safecracker, or a pickpocket.`}
          </li>
          <li>{`Isn't it true that you have been paid for your testimony?`}</li>
          <li>
            {`Hey, tell me something. You've got all this money. How come you
            always dress like you're doing your laundry?`}
          </li>
        </ul>
        <p>{`
          Ask her how her day was. Ah, computer dating. It's like pimping, but
          you rarely have to use the phrase "upside your head." Isn't it true
          that you have been paid for your testimony? What kind of a father
          would I be if I said no?
        ̀`}</p>
        <p>{`
          Oh, you're a dollar naughtier than most. We'll need to have a look
          inside you with this camera. Eeeee! Now say "nuclear wessels"! I never
          loved you. Michelle, I don't regret this, but I both rue and lament
          it.
        ̀`}</p>
        <p>{`
          You, a bobsleder!? That I'd like to see! Oh, you're a dollar naughtier
          than most. File not found. Daddy Bender, we're hungry. The key to
          victory is discipline, and that means a well made bed. You will
          practice until you can make your bed in your sleep.
        ̀`}</p>
        <p>{`
          These old Doomsday Devices are dangerously unstable. I'll rest easier
          not knowing where they are. For one beautiful night I knew what it was
          like to be a grandmother. Subjugated, yet honored. Leela's gonna kill
          me.
        ̀`}</p>
        <p>{`
          Isn't it true that you have been paid for your testimony? I had more,
          but you go ahead. Enough about your promiscuous mother, Hermes! We
          have bigger problems. Ven ve voke up, ve had zese wodies. Wow! A
          superpowers drug you can just rub onto your skin? You'd think it would
          be something you'd have to freebase.
        ̀`}</p>
        <p>{`
          Yes! In your face, Gandhi! For one beautiful night I knew what it was
          like to be a grandmother. Subjugated, yet honored. Are you crazy? I
          can't swallow that. Kids have names?
        ̀`}</p>
        <p>{`
          Can I use the gun? I meant 'physically'. Look, perhaps you could let
          me work for a little food? I could clean the floors or paint a fence,
          or service you sexually? I'm just glad my fat, ugly mama isn't alive
          to see this day.
        ̀`}</p>
        <p>{`
          Have you ever tried just turning off the TV, sitting down with your
          children, and hitting them? No, of course not. It was… uh… porno.
          Yeah, that's it. Spare me your space age technobabble, Attila the Hun!
        ̀`}</p>
        <p>{`
          One hundred dollars. But I know you in the future. I cleaned your
          poop. The alien mothership is in orbit here. If we can hit that
          bullseye, the rest of the dominoes will fall like a house of cards.
          Checkmate.
        ̀`}</p>
        <p>{`
          I've been there. My folks were always on me to groom myself and wear
          underpants. What am I, the pope? Bite my shiny metal ass. Guards!
          Bring me the forms I need to fill out to have her taken away! Hey! I'm
          a porno-dealing monster, what do I care what you think?
        ̀`}</p>
        <p>{`
          Oh, how I wish I could believe or understand that! There's only one
          reasonable course of action now: kill Flexo! No argument here. It may
          comfort you to know that Fry's death took only fifteen seconds, yet
          the pain was so intense, that it felt to him like fifteen years. And
          it goes without saying, it caused him to empty his bowels.
        ̀`}</p>
      </div>
    </section>
  </Wrapper>
)

export default Home
