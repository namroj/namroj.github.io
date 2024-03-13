import Link from 'next/link'

export default function Blog() {
    return <>
        <h2>Blog</h2>

        <br />
        <Link href="/blog/post" style={{ textDecoration: 'underline', fontSize: 'italic' }}>
            Artículo de prueba
        </Link>
    </>
}