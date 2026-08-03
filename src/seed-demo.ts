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

const reviewers = [
  { email: "alex.morgan@demo.com", username: "alex-morgan" },
  { email: "jordan.lee@demo.com", username: "jordan-lee" },
  { email: "sam.patel@demo.com", username: "sam-patel" },
  { email: "taylor.reed@demo.com", username: "taylor-reed" },
  { email: "casey.nguyen@demo.com", username: "casey-nguyen" },
];

/** Reviews keyed by product name — only some products get reviews for a natural look */
const productReviews: Record<
  string,
  { rating: number; description: string; reviewer: string }[]
> = {
  "Next.js 15 SaaS Starter Kit": [
    { rating: 5, reviewer: "alex-morgan", description: "Exactly what I needed to launch quickly. Clean architecture and well documented." },
    { rating: 5, reviewer: "jordan-lee", description: "Saved me weeks of boilerplate work. The typed API layer is a great touch." },
    { rating: 4, reviewer: "sam-patel", description: "Solid starter kit. Would love more payment examples, but overall excellent value." },
  ],
  "Modern UI/UX Design System (Figma)": [
    { rating: 5, reviewer: "taylor-reed", description: "Beautiful components and very easy to customize. My go-to design system now." },
    { rating: 4, reviewer: "casey-nguyen", description: "Comprehensive and well organized. A few icons were missing but easy to add." },
  ],
  "The Personal Finance Playbook": [
    { rating: 5, reviewer: "alex-morgan", description: "Clear, practical advice I could apply immediately. Highly recommend." },
    { rating: 4, reviewer: "taylor-reed", description: "Great overview for beginners. The budgeting templates alone are worth it." },
  ],
  "12-Week Nutrition & Meal Prep Plan": [
    { rating: 5, reviewer: "jordan-lee", description: "Finally a meal plan that fits a busy schedule. Recipes are simple and tasty." },
  ],
  "High-Converting Copywriting Templates": [
    { rating: 4, reviewer: "sam-patel", description: "Used these for a client landing page — conversion rate went up noticeably." },
    { rating: 5, reviewer: "casey-nguyen", description: "Fill-in-the-blank format makes writing copy so much faster." },
  ],
  "Cinematic Portrait Lightroom Presets": [
    { rating: 5, reviewer: "taylor-reed", description: "These presets give my portraits a professional look with minimal editing." },
    { rating: 4, reviewer: "alex-morgan", description: "Subtle and natural — not over-processed like most preset packs." },
  ],
  "The Home Chef Recipe Collection": [
    { rating: 5, reviewer: "jordan-lee", description: "Every recipe I've tried has been a hit with the family. Great variety." },
    { rating: 5, reviewer: "sam-patel", description: "Well written instructions and realistic prep times. Love it." },
    { rating: 4, reviewer: "casey-nguyen", description: "Good value for the number of recipes included. A few duplicates but overall great." },
  ],
  "Studio-Ready Music Production Pack": [
    { rating: 4, reviewer: "alex-morgan", description: "High quality samples. Gave my tracks a more polished sound right away." },
  ],
  "Brand Identity & Logo Design Kit": [
    { rating: 5, reviewer: "taylor-reed", description: "Helped me put together a cohesive brand for a client in one afternoon." },
    { rating: 4, reviewer: "jordan-lee", description: "Professional templates. Easy to adapt for different industries." },
  ],
  "Ultimate Travel Planning Templates": [
    { rating: 4, reviewer: "casey-nguyen", description: "Made planning our trip much less stressful. The budget sheet is especially useful." },
    { rating: 5, reviewer: "sam-patel", description: "Clean, practical templates. Used them for a two-week Europe trip." },
  ],
};

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
  const productIdByName = new Map<string, string>();
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

    const created = await payload.create({
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

    productIdByName.set(product.name, created.id);
    console.log(`  - ${product.name}  [${product.categorySlug}]`);
    index++;
  }

  // Demo reviewers + product reviews.
  console.log("\nCreating demo reviewers...");
  const reviewerTenantId = tenantIds[0];
  const reviewerIdByUsername = new Map<string, string>();

  for (const reviewer of reviewers) {
    const existing = await payload.find({
      collection: "users",
      limit: 1,
      where: { username: { equals: reviewer.username } },
    });

    if (existing.docs[0]) {
      reviewerIdByUsername.set(reviewer.username, existing.docs[0].id);
    } else {
      const user = await payload.create({
        collection: "users",
        data: {
          email: reviewer.email,
          username: reviewer.username,
          password: "demo",
          roles: ["user"],
          tenants: [{ tenant: reviewerTenantId }],
        } as never,
      });
      reviewerIdByUsername.set(reviewer.username, user.id);
    }
    console.log(`  - ${reviewer.username}`);
  }

  console.log("\nAdding product reviews...");
  let reviewCount = 0;
  for (const [productName, reviews] of Object.entries(productReviews)) {
    const productId = productIdByName.get(productName);
    if (!productId) continue;

    for (const review of reviews) {
      const userId = reviewerIdByUsername.get(review.reviewer);
      if (!userId) continue;

      await payload.create({
        collection: "reviews",
        data: {
          product: productId,
          user: userId,
          rating: review.rating,
          description: review.description,
        },
      });
      reviewCount++;
    }
    console.log(`  - ${productName}: ${reviews.length} review(s)`);
  }

  console.log(`\nDemo seed complete (${reviewCount} reviews added).`);
};

await seed();

process.exit(0);
