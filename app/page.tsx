"use client";

import { ChevronLeft, ChevronRight, Link } from "lucide-react";
import { useState } from "react";

interface NavItemType {
	title: string;
	url?: string;
	children?: NavItemType[];
}

const navigation: NavItemType[] = [
	{ title: "Home", url: "/home" },
	{
		title: "Products",
		children: [
			{ title: "Men", url: "/products/men" },
			{ title: "Women", url: "/products/women" },
			{
				title: "Electronics",
				children: [
					{ title: "Phones", url: "/products/electronics/phones" },
					{ title: "Laptops", url: "/products/electronics/laptop" },
				],
			},
		],
	},
	{
		title: "Services",
		children: [
			{ title: "Same Day Delivery", url: "/services/same-day-delivery" },
			{ title: "Customized Services", url: "/services/customized-services" },
		],
	},
	{ title: "About", url: "/about" },
	{ title: "Contact", url: "/contact" },
];

export default function Home() {
	const [currentList, setCurrentList] = useState<NavItemType[]>([]);

	return (
		<section className="flex flex-col gap-2 items-center">
			{currentList.length > 0 ? (
				<section>
					<button
						className="text-sm mb-5 text-muted-foreground flex items-center gap-5"
						onClick={() => setCurrentList(currentList.slice(1))}>
						<ChevronLeft size={12} />
						{currentList[0].title}
					</button>

					{currentList[0]?.children?.map((item) => (
						<section
							key={item.title}
							className="flex flex-col items-start gap-2">
							{item.children ? (
								<button
									className="text-base mb-5 text-muted-foreground flex items-center gap-5"
									onClick={() => {
										setCurrentList([
											{ title: item.title, children: item.children },
											...currentList,
										]);
									}}>
									{item.title}
									<ChevronRight size={12} />
								</button>
							) : (
								<a
									className="text-base mb-5 text-muted-foreground flex items-center gap-5"
									href={item.url}
									target="_blank"
									rel="noopener noreferrer">
									{item.title}
									<Link size={12} />
								</a>
							)}
						</section>
					))}
				</section>
			) : (
				<section>
					{navigation.map((item) => (
						<section
							key={item.title}
							className="flex flex-col items-start gap-2">
							{item.children ? (
								<button
									className="text-base mb-5 text-muted-foreground flex items-center gap-5"
									onClick={() => {
										setCurrentList([
											...currentList,
											{ title: item.title, children: item.children },
										]);
									}}>
									{item.title}
									<ChevronRight size={12} />
								</button>
							) : (
								<a
									className="flex items-center gap-5 text-base mb-5 text-muted-foreground"
									href={item.url}
									target="_blank"
									rel="noopener noreferrer">
									{item.title}
									<Link size={12} />
								</a>
							)}
						</section>
					))}
				</section>
			)}
		</section>
	);
}
