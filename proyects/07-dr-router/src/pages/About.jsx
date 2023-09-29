import {Link} from '../Link.jsx'

const i18n = {
  es: {
    title: 'Sobre Nosotros',
    button: 'Ir a la home',
    description: '¡Hola! esta es la AboutPage',
  },
  en: {
    title: 'About Us',
    button: 'Go to home',
    description: 'Hi! This is the AboutPage',
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}

export default function AboutPage({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')
  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img
          src="https://images.unsplash.com/photo-1695653421421-28f3816b424a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Foto de la App"
        />
        <p>{i18n.description}</p>
      </div>
      <Link to='/'>{i18n.button}</Link>
    </>
  );
}
