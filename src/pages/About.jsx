import Container from "../components/Container.jsx";

function TimelineItem({ time, role, org, desc }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs text-white/60">{time}</div>
            <div className="mt-2 text-base font-semibold">
                {role} <span className="text-white/60">· {org}</span>
            </div>
            <p className="mt-2 text-sm text-white/70 leading-6">{desc}</p>
        </div>
    );
}

export default function About() {
    return (
        <Container className="pt-14 pb-16 sm:pt-20">
            <div className="max-w-3xl">
                <div className="text-sm text-white/70">About me</div>
                <h1 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight">
                    Not average. I build products that move numbers.
                </h1>
                <p className="mt-4 text-white/70 leading-7">
                    Full-stack developer with a strong product mindset—clean UI, strong backend, and practical delivery.
                    I like fast feedback loops, measurable impact, and shipping.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                    <a className="rounded-2xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm hover:bg-white/15 transition" href="#">
                        My CV
                    </a>
                    <a className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/80 hover:text-white hover:border-white/20 transition" href="/projects">
                        My Projects
                    </a>
                </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="text-sm text-white/70">Core Stack</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {["React", "NodeJS", "ExpressJS", "PostgreSQL", "AWS EC2", "CloudFlare"].map((x) => (
                            <span key={x} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
                                {x}
                            </span>
                        ))}
                    </div>

                    <p className="mt-4 text-sm text-white/70 leading-6">
                        I care about performance, reliability, and UX polish. If it’s not crisp, it’s not done.
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="text-sm text-white/70">Now</div>
                    <h2 className="mt-2 text-2xl font-semibold">Building + Iterating</h2>
                    <p className="mt-3 text-sm text-white/70 leading-6">
                        Currently focused on shipping B2B tools, improving conversion, and scaling infra without any drawbacks.
                    </p>
                </div>
            </div>

            <h2 className="mt-12 text-2xl font-semibold">Timeline</h2>
            <div className="mt-4 grid grid-cols-1 gap-4">
                <TimelineItem
                    time="2024 — 2026"
                    role="Full-Stack Engineer"
                    org="Kensulate Corporation"
                    desc="Built a bespoke bulk dropshipping platform, automating inventory sync, order routing, and fulfilment workflows. Personalised commissions, pricing structure, sales reporting, and more, generates £30,000+ in sales monthly."
                />
                <TimelineItem
                    time="2023 — 2025"
                    role="Full-Stack Engineer"
                    org="Shopify Partners Program"
                    desc="Led development of a custom B2B SaaS platform enabling real-time dynamic pricing, automated consignor payouts, and sales reporting for two industry-leading retail stores, scaling annual revenue into the 8 figures."
                />
                <TimelineItem
                    time="2020 — 2023"
                    role="Backend Engineer"
                    org="Self Employed Founder"
                    desc="Founded 11Notify, a platform that alerts customers the moment high-ticket products come back in stock. Scaled to 350+ customers and sold after 3 years of growth."
                />
            </div>
        </Container>
    );
}
