import { IoLogoGithub } from 'react-icons/io5'
import { FaXTwitter, FaThreads } from 'react-icons/fa6'
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import { PiButterfly } from 'react-icons/pi'

import './links.scss'

export default function Links() {
  return (
    <ul className='links'>
      <li>
        <a href='https://github.com/jormanespinoza' title='Github' target='_blank'>
          <IoLogoGithub size={18} />
        </a>
      </li>
      <li>
        <a href='https://www.linkedin.com/in/jormanespinoza' title='LinkedIn' target='_blank'>
          <FaLinkedinIn size={18} />
        </a>
      </li>
      <li>
        <a href='https://twitter.com/_jormanespinoza' title='X' target='_blank'>
          <FaXTwitter size={18} />
        </a>
      </li>
      <li>
        <a href='https://www.instagram.com/_jormanespinoza' title='Instagram' target='_blank'>
          <FaInstagram size={18} />
        </a>
      </li>
      <li>
        <a href='https://www.threads.net/@_jormanespinoza' title='Threads' target='_blank'>
          <FaThreads size={18} />
        </a>
      </li>
      <li>
        <a href='https://bsky.app/profile/jormanespinoza.bsky.social' title='Bsky' target='_blank'>
          <PiButterfly size={18} />
        </a>
      </li>
    </ul>
  )
}
