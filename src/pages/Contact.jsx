import Container from "../components/Container.jsx";

export default function Contact() {
    return (
        <Container className="pt-14 pb-16 sm:pt-20">
            <div className="max-w-3xl">
                <div className="text-sm text-white/70">Contact</div>
                <h1 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight">Let’s build something</h1>
                <p className="mt-4 text-white/70 leading-7">
                    Best way to reach me is by email. If you’ve got a clear brief + timeline, even better.
                </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <a className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition" href="mailto:krishkp2502@gmail.com">
                    <div className="text-sm text-white/70">Email</div>
                    <div className="mt-2 text-lg font-semibold">krishkp2502@gmail.com</div>
                </a>

                <a className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/20 transition" href="https://github.com/krish-p25" target="_blank" rel="noreferrer">
                    <div className="text-sm text-white/70">GitHub</div>
                    <div className="mt-2 text-lg font-semibold">Repos</div>
                </a>

            </div>
        </Container>
    );
}
