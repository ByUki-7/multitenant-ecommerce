import { getPayload } from "payload";
import config from "@payload-config";

/**
 * Demo seed: wipes existing products (and their reviews/orders), then creates a
 * clean, professional showcase catalog spread unevenly across categories.
 *
 * Run with:  bun run src/seed-demo.ts
 */

type RichText = ReturnType<typeof richText>;

const richText = (paragraphs: string[]) => ({
  root: {
    type: "root",
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    version: 1,
    children: paragraphs.map((text) => ({
      type: "paragraph",
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
      textFormat: 0,
      children: [
        {
          type: "text",
          detail: 0,
          format: 0,
          mode: "normal" as const,
          style: "",
          text,
          version: 1,
        },
      ],
    })),
  },
});

const REFUND_POLICIES = ["30-day", "14-day", "7-day", "no-refund"] as const;

const tenants = [
  { name: "Northwind Goods", slug: "northwind", logoSeed: "northwind-studio" },
  { name: "Nimbus Studio", slug: "nimbus", logoSeed: "nimbus-labs" },
  { name: "Atlas Supply Co.", slug: "atlas-supply", logoSeed: "atlas-supply" },
  { name: "Verde & Co.", slug: "verde", logoSeed: "verde-collective" },
];

const tagNames = ["Bestseller", "New", "Template", "Guide", "Bundle", "Popular"];

interface ProductSeed {
  name: string;
  categorySlug: string;
  price: number;
  summary: string;
  imageSeed: string;
  tags?: string[];
}

// Uneven distribution across categories (self-improvement, drawing-painting,
// music-history, "other" intentionally left with 0 products).
const products: ProductSeed[] = [
  // business-money (3)
  { name: "The Personal Finance Playbook", categorySlug: "personal-finance", price: 29, imageSeed: "finance-playbook", summary: "A step-by-step system to budget, save and invest with confidence.", tags: ["Bestseller", "Guide"] },
  { name: "Beginner's Guide to Index Investing", categorySlug: "investing", price: 39, imageSeed: "index-investing", summary: "Build long-term wealth with a simple, proven index strategy.", tags: ["Guide"] },
  { name: "B2B Marketing & Sales Funnel Kit", categorySlug: "marketing-sales", price: 59, imageSeed: "sales-funnel", summary: "Templates and playbooks to turn leads into paying customers.", tags: ["Template", "Popular"] },

  // software-development (4)
  { name: "Next.js 15 SaaS Starter Kit", categorySlug: "web-development", price: 89, imageSeed: "nextjs-saas", summary: "Auth, billing and a typed API — ship your SaaS in a weekend.", tags: ["Bestseller", "Template"] },
  { name: "React Native Mobile App Boilerplate", categorySlug: "mobile-development", price: 79, imageSeed: "react-native", summary: "A production-ready cross-platform mobile foundation.", tags: ["Template"] },
  { name: "The Complete DevOps Handbook", categorySlug: "devops", price: 49, imageSeed: "devops-handbook", summary: "CI/CD, containers and infrastructure as code, explained clearly.", tags: ["Guide"] },
  { name: "Clean Code Patterns in TypeScript", categorySlug: "programming-languages", price: 35, imageSeed: "clean-code-ts", summary: "Write maintainable, scalable TypeScript with battle-tested patterns.", tags: ["New"] },

  // writing-publishing (2)
  { name: "High-Converting Copywriting Templates", categorySlug: "copywriting", price: 25, imageSeed: "copywriting", summary: "Fill-in-the-blank frameworks for pages, emails and ads.", tags: ["Template", "Popular"] },
  { name: "Self-Publishing Masterclass", categorySlug: "self-publishing", price: 45, imageSeed: "self-publishing", summary: "From manuscript to bestseller — publish your book the smart way.", tags: ["Guide"] },

  // education (1)
  { name: "The Online Course Creator Toolkit", categorySlug: "online-courses", price: 55, imageSeed: "course-creator", summary: "Everything you need to plan, record and launch a course.", tags: ["Bundle"] },

  // fitness-health (2)
  { name: "12-Week Nutrition & Meal Prep Plan", categorySlug: "nutrition", price: 30, imageSeed: "meal-prep", summary: "Balanced meal plans and grocery lists that actually stick.", tags: ["Bestseller"] },
  { name: "Home Workout Program (No Equipment)", categorySlug: "workout-plans", price: 27, imageSeed: "home-workout", summary: "Get stronger at home with progressive, guided routines.", tags: ["Popular"] },

  // design (3)
  { name: "Modern UI/UX Design System (Figma)", categorySlug: "ui-ux", price: 69, imageSeed: "design-system", summary: "A complete, themeable Figma system for shipping polished UIs.", tags: ["Bestseller", "Template"] },
  { name: "Brand Identity & Logo Design Kit", categorySlug: "graphic-design", price: 49, imageSeed: "brand-identity", summary: "Craft a memorable brand with editable logo and asset templates.", tags: ["Template"] },
  { name: "The Typography Pairing Guide", categorySlug: "typography", price: 19, imageSeed: "typography-guide", summary: "Curated font pairings and rules for beautiful type.", tags: ["Guide"] },

  // music (1)
  { name: "Studio-Ready Music Production Pack", categorySlug: "music-production", price: 42, imageSeed: "music-production", summary: "Samples, presets and templates to finish tracks faster.", tags: ["Bundle", "New"] },

  // photography (2)
  { name: "Cinematic Portrait Lightroom Presets", categorySlug: "portrait", price: 22, imageSeed: "portrait-presets", summary: "One-click cinematic looks for stunning portraits.", tags: ["Popular"] },
  { name: "Landscape Photography Masterclass", categorySlug: "landscape", price: 38, imageSeed: "landscape-course", summary: "Plan, shoot and edit breathtaking landscapes.", tags: ["Guide"] },

  // lifestyle (3)
  { name: "The Home Chef Recipe Collection", categorySlug: "food-drinks", price: 18, imageSeed: "home-chef", summary: "100+ tested recipes for weeknight dinners and weekend feasts.", tags: ["Bestseller"] },
  { name: "Ultimate Travel Planning Templates", categorySlug: "traveling", price: 24, imageSeed: "travel-planner", summary: "Itineraries, budgets and packing lists for stress-free trips.", tags: ["Template"] },
  { name: "Capsule Wardrobe Style Guide", categorySlug: "fashion", price: 21, imageSeed: "capsule-wardrobe", summary: "Build a versatile wardrobe with fewer, better pieces.", tags: ["Guide", "New"] },
];

const uploadImage = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  seed: string,
  size: number,
  alt: string
): Promise<string | null> => {
  try {
    const url = `https://picsum.photos/seed/${seed}/${size}/${size}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`status ${response.status}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const media = await payload.create({
      collection: "media",
      data: { alt },
      file: {
        data: buffer,
        mimetype: "image/jpeg",
        name: `${seed}.jpg`,
        size: buffer.length,
      },
    });

    return media.id;
  } catch (error) {
    console.warn(`  ! Failed to upload image "${seed}":`, (error as Error).message);
    return null;
  }
};

const seed = async () => {
  const payload = await getPayload({ config });

  console.log("Wiping existing products, reviews and orders...");
  await payload.delete({ collection: "orders", where: { id: { exists: true } } });
  await payload.delete({ collection: "reviews", where: { id: { exists: true } } });
  await payload.delete({ collection: "products", where: { id: { exists: true } } });

  // Categories: build a slug -> id map.
  const categoriesData = await payload.find({
    collection: "categories",
    limit: 1000,
    pagination: false,
    depth: 0,
  });
  const categoryIdBySlug = new Map<string, string>();
  for (const cat of categoriesData.docs) {
    categoryIdBySlug.set(cat.slug, cat.id);
  }

  // Tags: create (or reuse) and map name -> id.
  console.log("Ensuring tags...");
  const tagIdByName = new Map<string, string>();
  for (const name of tagNames) {
    const existing = await payload.find({
      collection: "tags",
      limit: 1,
      where: { name: { equals: name } },
    });
    if (existing.docs[0]) {
      tagIdByName.set(name, existing.docs[0].id);
    } else {
      const created = await payload.create({ collection: "tags", data: { name } });
      tagIdByName.set(name, created.id);
    }
  }

  // Tenants: create generic professional stores with logos.
  console.log("Creating generic professional tenants...");
  const tenantIds: string[] = [];
  for (const tenant of tenants) {
    const existing = await payload.find({
      collection: "tenants",
      limit: 1,
      where: { slug: { equals: tenant.slug } },
    });

    const logoId = await uploadImage(payload, tenant.logoSeed, 240, `${tenant.name} logo`);

    if (existing.docs[0]) {
      const updated = await payload.update({
        collection: "tenants",
        id: existing.docs[0].id,
        data: {
          name: tenant.name,
          ...(logoId ? { image: logoId } : {}),
          stripeDetailsSubmitted: true,
        },
      });
      tenantIds.push(updated.id);
    } else {
      const created = await payload.create({
        collection: "tenants",
        data: {
          name: tenant.name,
          slug: tenant.slug,
          stripeAccountId: `acct_demo_${tenant.slug}`,
          stripeDetailsSubmitted: true,
          ...(logoId ? { image: logoId } : {}),
        },
      });
      tenantIds.push(created.id);
    }
    console.log(`  - ${tenant.name} (${tenant.slug})`);
  }

  // Products.
  console.log(`Creating ${products.length} products...`);
  let index = 0;
  for (const product of products) {
    const categoryId = categoryIdBySlug.get(product.categorySlug);
    if (!categoryId) {
      console.warn(`  ! Skipping "${product.name}" — category "${product.categorySlug}" not found`);
      continue;
    }

    const tenantId = tenantIds[index % tenantIds.length];
    const imageId = await uploadImage(payload, product.imageSeed, 800, product.name);
    const tagIds = (product.tags ?? [])
      .map((t) => tagIdByName.get(t))
      .filter((id): id is string => Boolean(id));

    const description: RichText = richText([
      product.summary,
      "This is a demo product created to showcase the Zantora marketplace.",
    ]);

    await payload.create({
      collection: "products",
      data: {
        name: product.name,
        price: product.price,
        category: categoryId,
        tenant: tenantId,
        description,
        refundPolicy: REFUND_POLICIES[index % REFUND_POLICIES.length],
        ...(imageId ? { image: imageId } : {}),
        ...(tagIds.length ? { tags: tagIds } : {}),
      } as never,
    });

    console.log(`  - ${product.name}  [${product.categorySlug}]`);
    index++;
  }

  console.log("\nDemo seed complete.");
};

await seed();

process.exit(0);
