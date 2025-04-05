import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'New React Router App' },
        { name: 'about', content: 'About this app' },
    ]
}

export default function Home() {
    return <div>About...</div>
}
