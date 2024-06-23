import Image from 'next/image'

export default function HomePage() {
  return (
    <Image
      src='https://pbs.twimg.com/profile_banners/1435415903416500227/1713968806/1500x500'
      alt='Hero'
      width={1500}
      height={500}
      priority
      style={{
        objectFit: 'cover',
        objectPosition: 'center',
        width: '100%',
        height: 'auto',
        borderRadius: '1rem',
      }}
    />
  )
}
