"use client";

import { MoreVertical, Mail, Phone, MapPin, Search, UserPlus } from "lucide-react";

const contacts = [
  {
    id: 1,
    name: "Alexander Wright",
    company: "Stark Industries",
    role: "CEO",
    email: "alex@stark.com",
    phone: "+1 (555) 123-4567",
    status: "Customer",
    initials: "AW",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    company: "Cyberdyne Systems",
    role: "CTO",
    email: "s.jenkins@cyberdyne.io",
    phone: "+1 (555) 987-6543",
    status: "Lead",
    initials: "SJ",
  },
  {
    id: 3,
    name: "Michael Chen",
    company: "Wayne Enterprises",
    role: "VP Marketing",
    email: "m.chen@wayne.org",
    phone: "+1 (555) 456-7890",
    status: "Active",
    initials: "MC",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    company: "Globex Corp",
    role: "Director of Ops",
    email: "elena.r@globex.net",
    phone: "+1 (555) 246-8135",
    status: "Lead",
    initials: "ER",
  },
  {
    id: 5,
    name: "David Miller",
    company: "Umbrella Corp",
    role: "Senior Researcher",
    email: "d.miller@umbrella.com",
    phone: "+1 (555) 135-7924",
    status: "Customer",
    initials: "DM",
  },
];

export default function ContactsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground text-sm">Centralized database for all your business relationships.</p>
        </div>
        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm font-medium hover:bg-black/90 transition-colors">
          <UserPlus className="w-4 h-4" />
          Add Contact
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email or company..."
            className="w-full bg-white border border-border/50 rounded-none py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-black transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="p-6 border border-border/50 bg-white hover:border-black transition-colors relative group">
            <button className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4" />
            </button>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-muted flex items-center justify-center font-bold text-sm">
                {contact.initials}
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none mb-1">{contact.name}</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{contact.role} @ {contact.company}</p>
                <div className="mt-2">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-muted border border-border/50">
                    {contact.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Mail className="w-3.5 h-3.5" />
                {contact.email}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Phone className="w-3.5 h-3.5" />
                {contact.phone}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                New York, USA
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50 flex gap-2">
              <button className="flex-1 py-1.5 text-[10px] uppercase tracking-widest font-bold border border-black hover:bg-black hover:text-white transition-colors">
                Profile
              </button>
              <button className="flex-1 py-1.5 text-[10px] uppercase tracking-widest font-bold border border-border/50 hover:bg-muted transition-colors">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
