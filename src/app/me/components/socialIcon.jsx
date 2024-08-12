export default function SocialIcon({ href, icon, type, title }) {
    const
        baseClasses = 'hover:text-indigo-500 hover:scale-110 transition-all duration-300 p-0 border-1 border-solid border-transparent rounded-3xl no-underline items-center self-center justify-center flex flex-col pt-4 text-gray-700',
        iType = ['code', 'user', 'users', 'envelope'].includes(icon) ? 'fas' : 'fab';
    if (type === 1) return (
        <a
            href={href}
            target='_blank'
            className={`${baseClasses} ${iType} fa-${icon} fa-3x `}
            title={title}
            rel='me'
        >
        </a>
    )
    else return (
        <a
            href={href}
            target='_blank'
            className={`${baseClasses} text-5xl mso`}
            title={title}
            rel='me'
        >
            {icon}
        </a>
    )
}