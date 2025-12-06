export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    type: "Online" | "In-Person";
    location: string;
    description: string;
    registrationUrl: string;
}

export const events: Event[] = [
    {
        id: "1",
        title: "Anon Open Source Summit 2025",
        date: "2025-01-15",
        time: "10:00 AM UTC",
        type: "Online",
        location: "Discord Stage",
        description: "Join us for our annual summit discussing the future of decentralized tech.",
        registrationUrl: "https://discord.gg/anon",
    },
    {
        id: "2",
        title: "Community Hackathon: Privacy First",
        date: "2025-02-01",
        time: "48 Hours",
        type: "Online",
        location: "Global",
        description: "Build privacy-focused tools and win prizes. Open to all skill levels.",
        registrationUrl: "https://github.com/anonofficals",
    },
    {
        id: "3",
        title: "Contributor Workshop: Getting Started",
        date: "2025-02-10",
        time: "2:00 PM UTC",
        type: "Online",
        location: "Google Meet",
        description: "Learn how to make your first contribution to Anon projects.",
        registrationUrl: "#",
    },
];
