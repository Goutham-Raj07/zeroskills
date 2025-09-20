"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

type ResourceLink = { label: string; href: string }
type Category = {
	key: string
	title: string
	description: string
	dateText: string
	links: ResourceLink[]
	materials: ResourceLink[] | string[]
}

const CATEGORIES: Category[] = [
	{
		key: "neet",
		title: "Medical — NEET (UG)",
		description: "National Eligibility cum Entrance Test",
		dateText: "Refer official NTA notifications",
		links: [
			{ label: "Official Website", href: "https://neet.nta.nic.in/" },
			{ label: "NTA Official", href: "https://nta.ac.in/" },
			{ label: "Information Bulletin", href: "https://neet.nta.nic.in/information-bulletin/" },
		],
		materials: [
			{ label: "NCERT Books (Phy/Chem/Bio)", href: "https://ncert.nic.in/textbook.php" },
			"Previous Year Papers (official site)",
			"Mock Tests (DigiLocker/official partners)",
		],
	},
	{
		key: "jee",
		title: "Engineering — JEE",
		description: "JEE Main and JEE Advanced",
		dateText: "Refer NTA (Main) and IIT (Advanced) notices",
		links: [
			{ label: "JEE Main Official", href: "https://jeemain.nta.nic.in/" },
			{ label: "JEE Advanced", href: "https://jeeadv.ac.in/" },
			{ label: "NTA JEE Portal", href: "https://nta.ac.in/" },
		],
		materials: [
			{ label: "NCERT (Math/Phy/Chem)", href: "https://ncert.nic.in/textbook.php" },
			"Previous Year Papers (official sites)",
			"Mock Tests (NTA Abhyas/official)",
		],
	},
	{
		key: "clat",
		title: "Law — CLAT",
		description: "Common Law Admission Test",
		dateText: "Refer CLAT Consortium notifications",
		links: [
			{ label: "Official CLAT Website", href: "https://consortiumofnlus.ac.in/" },
			{ label: "CLAT Information", href: "https://clatconsortium.ac.in/" },
		],
		materials: [
			"English, Logical Reasoning, Legal Aptitude, GK/Current Affairs, Quant",
			"Previous Year Papers (official site)",
		],
	},
	{
		key: "cuet",
		title: "CUET (UG/PG)",
		description: "Common University Entrance Test",
		dateText: "Refer NTA CUET notifications",
		links: [
			{ label: "Official CUET Website", href: "https://cuet.samarth.ac.in/" },
			{ label: "NTA CUET", href: "https://cuet.nta.nic.in/" },
		],
		materials: [
			"NCERT Books (domain subjects, language)",
			"Previous Year Papers (official)",
		],
	},
	{
		key: "govt",
		title: "Government Jobs — NDA, SSC, Railways, State PSC",
		description: "Defence and Civil recruitment portals",
		dateText: "Refer respective commission/board notifications",
		links: [
			{ label: "UPSC Official (NDA)", href: "https://www.upsc.gov.in/" },
			{ label: "Join Indian Army (NDA)", href: "https://joinindianarmy.nic.in/" },
			{ label: "SSC Official", href: "https://ssc.nic.in/" },
			{ label: "SSC Exam Portal", href: "https://ssc.nic.in/Portal/Examination" },
			{ label: "RRB Official", href: "https://www.rrbcdg.gov.in/" },
			{ label: "Indian Railways", href: "https://indianrailways.gov.in/" },
			{ label: "UPPSC (UP)", href: "https://uppsc.up.nic.in/" },
			{ label: "MPSC (Maharashtra)", href: "https://mpsc.gov.in/" },
			{ label: "BPSC (Bihar)", href: "https://www.bpsc.bih.nic.in/" },
		],
		materials: [
			{ label: "NCERT Books", href: "https://ncert.nic.in/textbook.php" },
			"Previous Year Papers (official websites)",
			"Mock Tests (official portals/partners)",
		],
	},
]

export default function ImportantExamsPage() {
	const [query, setQuery] = useState("")
	const [tab, setTab] = useState("neet")

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase()
		return CATEGORIES.map((c) => {
			if (!q) return c
			const linkMatches = c.links.filter((l) => l.label.toLowerCase().includes(q) || l.href.toLowerCase().includes(q))
			const matMatches = (c.materials as any[]).filter((m) => {
				if (typeof m === "string") return m.toLowerCase().includes(q)
				return m.label.toLowerCase().includes(q) || m.href.toLowerCase().includes(q)
			})
			return { ...c, links: linkMatches, materials: matMatches }
		})
	}, [query])

	const categoriesByKey: Record<string, Category> = useMemo(() => {
		const byKey: Record<string, Category> = {}
		for (const c of (query ? filtered : CATEGORIES)) byKey[c.key] = c as Category
		return byKey
	}, [filtered, query])

	return (
		<div className="container mx-auto px-4 py-10">
			<div className="space-y-2 mb-6 text-center">
				<h1 className="text-3xl font-bold">Important Exams & Official Resources</h1>
				<p className="text-muted-foreground">Search resources, switch categories, and open official links.</p>
			</div>

			<div className="mx-auto max-w-3xl mb-6">
				<Input placeholder="Search links, materials, portals..." value={query} onChange={(e) => setQuery(e.target.value)} />
			</div>

			<Tabs value={tab} onValueChange={setTab} className="mx-auto max-w-4xl">
				<TabsList className="flex flex-wrap">
					{(query ? filtered : CATEGORIES).map((c) => (
						<TabsTrigger key={c.key} value={c.key} className="whitespace-nowrap">{c.title.split("—")[0].trim()}</TabsTrigger>
					))}
				</TabsList>

				{(query ? filtered : CATEGORIES).map((c) => (
					<TabsContent key={c.key} value={c.key}>
						<Card>
							<CardHeader>
								<CardTitle>{c.title}</CardTitle>
								<CardDescription>{c.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="mb-4 text-sm"><span className="font-medium">Exam Dates:</span> {c.dateText}</div>
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<p className="font-medium mb-2">Official Links</p>
										<ScrollArea className="h-44">
											<ul className="space-y-2 text-sm pr-2">
												{c.links.map((l) => (
													<li key={l.href} className="flex justify-between items-center gap-3">
														<a className="underline" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
														<Button variant="outline" size="xs" onClick={() => navigator.clipboard.writeText(l.href)}>Copy</Button>
													</li>
												))}
												{c.links.length === 0 && <li className="text-muted-foreground">No matches</li>}
											</ul>
										</ScrollArea>
									</div>
									<div>
										<p className="font-medium mb-2">Subject Materials</p>
										<ScrollArea className="h-44">
											<ul className="space-y-2 text-sm pr-2">
												{(c.materials as any[]).map((m, idx) => (
													<li key={idx} className="flex justify-between items-center gap-3">
														{typeof m === "string" ? (
															<span>{m}</span>
														) : (
															<>
																<a className="underline" href={m.href} target="_blank" rel="noopener noreferrer">{m.label}</a>
																<Button variant="outline" size="xs" onClick={() => navigator.clipboard.writeText(m.href)}>Copy</Button>
															</>
														)}
													</li>
												))}
												{(c.materials as any[]).length === 0 && <li className="text-muted-foreground">No matches</li>}
											</ul>
										</ScrollArea>
									</div>
								</div>
								<div className="mt-6 text-xs text-muted-foreground">
									Important: Always refer to official websites for the most accurate and updated information about exam dates, syllabus, and applications.
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				))}
			</Tabs>
		</div>
	)
}
