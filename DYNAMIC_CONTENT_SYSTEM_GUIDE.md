# Dynamic Content System Guide

This guide explains how to create dynamic, database-driven content in this Next.js application using the testimonials system as an example. You'll learn how to add a simple card component that can be managed from the admin dashboard.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [The Four Key Files](#the-four-key-files)
3. [Step 1: Define the Data Structure (Config)](#step-1-define-the-data-structure-config)
4. [Step 2: Create Admin Interface](#step-2-create-admin-interface)
5. [Step 3: Create Frontend Component](#step-3-create-frontend-component)
6. [Step 4: Connect to Main Page](#step-4-connect-to-main-page)
7. [Complete Example: Simple Card](#complete-example-simple-card)
8. [How Data Flows](#how-data-flows)

---

## System Overview

This app uses a **type-safe, centralized configuration system** that:

1. ✅ Defines all content structures in one place
2. ✅ Stores content in Supabase database
3. ✅ Provides admin UI for CRUD operations
4. ✅ Renders dynamically on the frontend
5. ✅ Supports reordering, adding, editing, and deleting

**Key Concept**: Content is stored as JSON in the database and typed with TypeScript interfaces.

---

## The Four Key Files

| File | Purpose | Example |
|------|---------|---------|
| `src/app/_config.ts` | Define data types and fallback data | `TestimonialItem` interface |
| `src/components/admin/home-inputs.tsx` | Admin UI for editing content | Testimonial CRUD operations |
| `src/components/Home/Section7Testimonials.tsx` | Frontend display component | Renders testimonials |
| `src/app/page.tsx` | Main page that fetches & passes data | Fetches from DB, passes to components |

---

## Step 1: Define the Data Structure (Config)

**File**: `src/app/_config.ts`

### 1.1 Create the Item Type

Define what each item in your collection looks like:

```typescript
// Define the structure for a single testimonial
export type TestimonialItem = {
    id: string;              // Unique identifier
    image: string;           // Image URL
    rating: number;          // 1-5 star rating
    testimonial: string;     // The testimonial text
    clientName: string;      // Client's name
    clientRole: string;      // Client's role/title
    order?: number;          // For reordering (optional)
};
```

**Key Points**:
- Always include `id` for unique identification
- Add `order?` if you want drag-and-drop reordering
- Use descriptive property names
- Keep types simple (string, number, boolean)

### 1.2 Add to Main Content Interface

Add your new field to the `HomePageContent` interface:

```typescript
export interface HomePageContent {
    // ... existing fields ...
    
    // Section 7 - Testimonials
    section7Title: string;
    section7TitleBold?: boolean;
    section7Testimonials: TestimonialItem[];  // ← Your new field (array)
    
    // ... more fields ...
}
```

### 1.3 Provide Fallback Data

Add default values in `homePageFallbackData`:

```typescript
export const homePageFallbackData: HomePageProps = {
    slug: "home",
    content: {
        // ... existing defaults ...
        
        section7Title: "What Our Clients Say",
        section7TitleBold: true,
        section7Testimonials: [
            {
                id: "testimonial-1",
                image: "/placeholder.jpg",
                rating: 5,
                testimonial: "Amazing service!",
                clientName: "John Doe",
                clientRole: "CEO, Tech Corp",
                order: 0,
            }
        ],
        
        // ... more defaults ...
    }
};
```

**Why Fallback Data?**
- Provides initial content for new installations
- Ensures the app doesn't break if DB is empty
- Gives examples of expected data format

---

## Step 2: Create Admin Interface

**File**: `src/components/admin/home-inputs.tsx`

### 2.1 Set Up State Management

Initialize state from props with ordering:

```typescript
export default function HomeAdminInputs(props: HomePageProps) {
    // Initialize testimonials with proper ordering
    const [section7Testimonials, setSection7Testimonials] = useState<TestimonialItem[]>(() => {
        const items = props.content.section7Testimonials || [];
        return items.map((item, index) => ({
            ...item,
            order: item.order !== undefined ? item.order : index,
        })).sort((a, b) => (a.order || 0) - (b.order || 0));
    });

    // ... other state ...
}
```

**What's Happening?**
1. Destructure testimonials from `props.content`
2. Ensure each item has an `order` property
3. Sort by order for consistent display

### 2.2 Include in Save Handler

Add your field to the save function:

```typescript
const handleSave = async () => {
    await updatePage({
        ...props,
        content: {
            ...props.content,
            // ... other fields ...
            section7Title,
            section7TitleBold,
            section7Testimonials,  // ← Your field
            // ... more fields ...
        },
    });
};
```

### 2.3 Create the Admin UI

Build the interface for managing items:

```tsx
<AccordionItem value="section7testimonials">
    <AccordionTrigger className="text-xl text-white font-bold">
        Section 7 - Testimonials
    </AccordionTrigger>
    <AccordionContent>
        <section className="pt-4">
            <div className="space-y-4">
                
                {/* Section Title Input */}
                <div className="space-y-1">
                    <label className="block text-white text-sm font-medium">
                        Section Title
                    </label>
                    <EditableElement
                        as="textarea"
                        className="w-full p-1.5 bg-white/5 text-white rounded border border-white/10"
                        onTextChange={setSection7Title}
                        defaultValue={section7Title}
                    />
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={section7TitleBold}
                            onChange={(e) => setSection7TitleBold(e.target.checked)}
                        />
                        <span className="text-white text-xs">Make title bold</span>
                    </label>
                </div>

                {/* Testimonials List */}
                <div className="space-y-3 border-t border-white/10 pt-3">
                    <h3 className="text-sm font-semibold text-white">Testimonials</h3>
                    
                    {section7Testimonials.length === 0 ? (
                        <div className="text-center py-6 text-white/50 text-sm">
                            <p>No testimonials yet. Click "Add Testimonial" to get started.</p>
                        </div>
                    ) : (
                        section7Testimonials
                            .slice()
                            .sort((a, b) => (a.order || 0) - (b.order || 0))
                            .map((testimonial, index) => (
                                <div key={testimonial.id} className="bg-white/5 p-3 rounded-lg space-y-3">
                                    
                                    {/* Header with Delete Button */}
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-white font-semibold text-sm">
                                            Testimonial {index + 1}
                                        </h4>
                                        <button
                                            onClick={() => {
                                                const updated = section7Testimonials.filter(
                                                    (t) => t.id !== testimonial.id
                                                );
                                                setSection7Testimonials(updated);
                                            }}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    {/* Image Input */}
                                    <div className="space-y-2">
                                        <label className="block text-white text-sm font-medium">
                                            Image
                                        </label>
                                        <div className="flex gap-3">
                                            <EditableImage
                                                src={testimonial.image}
                                                alt={testimonial.clientName}
                                                width={600}
                                                height={270}
                                                className="w-40 h-24 rounded-lg object-cover"
                                                onImageChange={(url) => {
                                                    const updated = section7Testimonials.map((t) =>
                                                        t.id === testimonial.id 
                                                            ? { ...t, image: url } 
                                                            : t
                                                    );
                                                    setSection7Testimonials(updated);
                                                }}
                                            />
                                            <input
                                                type="url"
                                                value={testimonial.image}
                                                onChange={(e) => {
                                                    const updated = section7Testimonials.map((t) =>
                                                        t.id === testimonial.id 
                                                            ? { ...t, image: e.target.value } 
                                                            : t
                                                    );
                                                    setSection7Testimonials(updated);
                                                }}
                                                className="flex-1 p-2 bg-white/5 text-white rounded border border-white/10"
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                    </div>

                                    {/* Other Fields (Rating, Name, etc.) */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="space-y-1">
                                            <label className="block text-white text-sm">Rating (1-5)</label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="5"
                                                value={testimonial.rating}
                                                onChange={(e) => {
                                                    const rating = Math.min(5, Math.max(1, parseInt(e.target.value) || 1));
                                                    const updated = section7Testimonials.map((t) =>
                                                        t.id === testimonial.id 
                                                            ? { ...t, rating } 
                                                            : t
                                                    );
                                                    setSection7Testimonials(updated);
                                                }}
                                                className="w-full p-1.5 bg-white/5 text-white rounded border border-white/10"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-white text-sm">Client Name</label>
                                            <input
                                                type="text"
                                                value={testimonial.clientName}
                                                onChange={(e) => {
                                                    const updated = section7Testimonials.map((t) =>
                                                        t.id === testimonial.id 
                                                            ? { ...t, clientName: e.target.value } 
                                                            : t
                                                    );
                                                    setSection7Testimonials(updated);
                                                }}
                                                className="w-full p-1.5 bg-white/5 text-white rounded border border-white/10"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-white text-sm">Client Role</label>
                                            <input
                                                type="text"
                                                value={testimonial.clientRole}
                                                onChange={(e) => {
                                                    const updated = section7Testimonials.map((t) =>
                                                        t.id === testimonial.id 
                                                            ? { ...t, clientRole: e.target.value } 
                                                            : t
                                                    );
                                                    setSection7Testimonials(updated);
                                                }}
                                                className="w-full p-1.5 bg-white/5 text-white rounded border border-white/10"
                                                placeholder="CEO, Company Name"
                                            />
                                        </div>
                                    </div>

                                    {/* Testimonial Text */}
                                    <div className="space-y-1">
                                        <label className="block text-white text-sm">Testimonial</label>
                                        <EditableElement
                                            as="textarea"
                                            className="w-full p-1.5 bg-white/5 text-white rounded border border-white/10 min-h-[100px]"
                                            onTextChange={(text) => {
                                                const updated = section7Testimonials.map((t) =>
                                                    t.id === testimonial.id 
                                                        ? { ...t, testimonial: text } 
                                                        : t
                                                );
                                                setSection7Testimonials(updated);
                                            }}
                                            defaultValue={testimonial.testimonial}
                                        />
                                    </div>
                                </div>
                            ))
                    )}

                    {/* Add Button */}
                    <button
                        onClick={() => {
                            const newTestimonial: TestimonialItem = {
                                id: `testimonial-${Date.now()}`,
                                image: "/placeholder.jpg",
                                rating: 5,
                                testimonial: "",
                                clientName: "",
                                clientRole: "",
                                order: section7Testimonials.length,
                            };
                            setSection7Testimonials([...section7Testimonials, newTestimonial]);
                        }}
                        className="px-3 py-1.5 bg-white/10 text-white rounded border border-white/20 hover:bg-white/20"
                    >
                        + Add Testimonial
                    </button>
                </div>
            </div>
        </section>
    </AccordionContent>
</AccordionItem>
```

**Key Patterns**:

1. **Update Pattern**: Always map through the array and return a new array
   ```typescript
   const updated = section7Testimonials.map((t) =>
       t.id === testimonial.id 
           ? { ...t, fieldName: newValue }  // Update matching item
           : t                               // Keep others unchanged
   );
   setSection7Testimonials(updated);
   ```

2. **Add Pattern**: Create new item with unique ID
   ```typescript
   const newItem: TestimonialItem = {
       id: `testimonial-${Date.now()}`,  // Unique timestamp ID
       // ... other fields with defaults
       order: section7Testimonials.length,
   };
   setSection7Testimonials([...section7Testimonials, newItem]);
   ```

3. **Delete Pattern**: Filter out the item
   ```typescript
   const updated = section7Testimonials.filter((t) => t.id !== testimonial.id);
   setSection7Testimonials(updated);
   ```

---

## Step 3: Create Frontend Component

**File**: `src/components/Home/Section7Testimonials.tsx`

### 3.1 Define Props Interface

```typescript
"use client";

import { HomePageProps } from "@/app/_config";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

interface Section7TestimonialsProps {
    content: HomePageProps["content"];
}
```

### 3.2 Create the Component

```typescript
export default function Section7Testimonials({ content }: Section7TestimonialsProps) {
    // Early return if no data
    if (!content.section7Testimonials || content.section7Testimonials.length === 0) {
        return null;
    }

    // Sort testimonials by order
    const sortedTestimonials = content.section7Testimonials
        .slice()
        .sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
        <section className="relative py-20 md:py-32 px-4">
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                
                {/* Section Title */}
                {content.section7Title && (
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={`text-4xl sm:text-5xl md:text-6xl text-white text-center mb-16 ${
                            content.section7TitleBold ? "font-bold" : "font-normal"
                        }`}
                    >
                        {content.section7Title}
                    </motion.h3>
                )}

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                            }}
                            className="bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.clientName}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Star Rating */}
                            <div className="flex gap-1 mb-3">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                            i < testimonial.rating
                                                ? "fill-white text-white"
                                                : "fill-white/20 text-white/20"
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-white/80 text-sm mb-4 flex-1">
                                &ldquo;{testimonial.testimonial}&rdquo;
                            </p>

                            {/* Client Info */}
                            <div className="border-t border-white/20 pt-4">
                                <p className="text-white font-semibold">
                                    {testimonial.clientName}
                                </p>
                                <p className="text-white/60 text-sm italic">
                                    {testimonial.clientRole}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

**Key Concepts**:
- Always sort by `order` property
- Use `.slice()` to avoid mutating original array
- Handle empty states gracefully
- Use Framer Motion for animations
- Make responsive with Tailwind classes

---

## Step 4: Connect to Main Page

**File**: `src/app/page.tsx`

### 4.1 Import the Component

```typescript
import Section7Testimonials from "@/components/Home/Section7Testimonials";
```

### 4.2 Add to Page Layout

```typescript
export default async function HomePage() {
    const content = await getHomePageContent(); // Fetches from DB

    return (
        <main>
            {/* ... other sections ... */}
            
            <Section7Testimonials content={content} />
            
            {/* ... more sections ... */}
        </main>
    );
}
```

**Data Flow**:
1. `getHomePageContent()` fetches from Supabase
2. Returns `HomePageProps` object with all content
3. Pass `content` prop to your component
4. Component renders the data

---

## Complete Example: Simple Card

Let's create a simple "Feature Card" system from scratch.

### Step 1: Config

```typescript
// src/app/_config.ts

export type FeatureCard = {
    id: string;
    title: string;
    description: string;
    image: string;
    buttonText: string;
    buttonUrl: string;
    order?: number;
};

export interface HomePageContent {
    // ... existing fields ...
    featureCards: FeatureCard[];
}

export const homePageFallbackData: HomePageProps = {
    slug: "home",
    content: {
        // ... existing defaults ...
        featureCards: [
            {
                id: "card-1",
                title: "Amazing Feature",
                description: "This feature will blow your mind!",
                image: "/placeholder.jpg",
                buttonText: "Learn More",
                buttonUrl: "/features",
                order: 0,
            }
        ],
    }
};
```

### Step 2: Admin Interface

```typescript
// src/components/admin/home-inputs.tsx

// In your component:
const [featureCards, setFeatureCards] = useState<FeatureCard[]>(() => {
    const items = props.content.featureCards || [];
    return items.map((item, index) => ({
        ...item,
        order: item.order !== undefined ? item.order : index,
    })).sort((a, b) => (a.order || 0) - (b.order || 0));
});

// In handleSave:
await updatePage({
    ...props,
    content: {
        ...props.content,
        featureCards,  // ← Add this
    },
});

// In JSX (inside Accordion):
<AccordionItem value="featureCards">
    <AccordionTrigger>Feature Cards</AccordionTrigger>
    <AccordionContent>
        {featureCards.map((card) => (
            <div key={card.id} className="bg-white/5 p-3 rounded-lg mb-3">
                <input
                    type="text"
                    value={card.title}
                    onChange={(e) => {
                        const updated = featureCards.map((c) =>
                            c.id === card.id ? { ...c, title: e.target.value } : c
                        );
                        setFeatureCards(updated);
                    }}
                    placeholder="Card Title"
                    className="w-full p-2 bg-white/5 text-white rounded mb-2"
                />
                <textarea
                    value={card.description}
                    onChange={(e) => {
                        const updated = featureCards.map((c) =>
                            c.id === card.id ? { ...c, description: e.target.value } : c
                        );
                        setFeatureCards(updated);
                    }}
                    placeholder="Description"
                    className="w-full p-2 bg-white/5 text-white rounded mb-2"
                />
                {/* Add more fields... */}
            </div>
        ))}
        
        <button
            onClick={() => {
                const newCard: FeatureCard = {
                    id: `card-${Date.now()}`,
                    title: "",
                    description: "",
                    image: "/placeholder.jpg",
                    buttonText: "Learn More",
                    buttonUrl: "#",
                    order: featureCards.length,
                };
                setFeatureCards([...featureCards, newCard]);
            }}
            className="px-4 py-2 bg-white/10 text-white rounded"
        >
            Add Card
        </button>
    </AccordionContent>
</AccordionItem>
```

### Step 3: Frontend Component

```typescript
// src/components/Home/FeatureCards.tsx

"use client";

import { HomePageProps } from "@/app/_config";
import { motion } from "framer-motion";
import Image from "next/image";

interface FeatureCardsProps {
    content: HomePageProps["content"];
}

export default function FeatureCards({ content }: FeatureCardsProps) {
    if (!content.featureCards || content.featureCards.length === 0) {
        return null;
    }

    const sortedCards = content.featureCards
        .slice()
        .sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {sortedCards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white/10 rounded-2xl p-6 border border-white/20"
                    >
                        <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                            {card.title}
                        </h3>
                        <p className="text-white/70 mb-4">
                            {card.description}
                        </p>
                        <a
                            href={card.buttonUrl}
                            className="inline-block px-6 py-2 bg-white text-black rounded-full hover:bg-white/90 transition-colors"
                        >
                            {card.buttonText}
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
```

### Step 4: Add to Page

```typescript
// src/app/page.tsx

import FeatureCards from "@/components/Home/FeatureCards";

export default async function HomePage() {
    const content = await getHomePageContent();

    return (
        <main>
            {/* ... other sections ... */}
            <FeatureCards content={content} />
            {/* ... more sections ... */}
        </main>
    );
}
```

---

## How Data Flows

Here's the complete data flow:

```
┌─────────────────────────────────────────────────────────────┐
│                    1. INITIAL LOAD                          │
│                                                             │
│  Browser Request → page.tsx → Supabase DB                  │
│                                   ↓                          │
│                    Returns JSON content                     │
│                                   ↓                          │
│                    Passes to Components                     │
│                                   ↓                          │
│                    Components Render                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    2. ADMIN EDIT                            │
│                                                             │
│  Admin UI → User edits → useState updates                  │
│                              ↓                               │
│                    Click "Save" button                      │
│                              ↓                               │
│                    handleSave() called                      │
│                              ↓                               │
│                    updatePage() hook                        │
│                              ↓                               │
│                    Server Action                            │
│                              ↓                               │
│                    Supabase DB updated                      │
│                              ↓                               │
│                    Page revalidates                         │
│                              ↓                               │
│                    Frontend shows new data                  │
└─────────────────────────────────────────────────────────────┘
```

### Database Structure

Content is stored as JSON in Supabase:

```sql
CREATE TABLE pages (
    slug TEXT PRIMARY KEY,
    content JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
);
```

Example row:

```json
{
    "slug": "home",
    "content": {
        "heroTitle": "Welcome",
        "featureCards": [
            {
                "id": "card-1",
                "title": "Feature 1",
                "description": "Amazing feature",
                "image": "/image.jpg",
                "buttonText": "Learn More",
                "buttonUrl": "/features",
                "order": 0
            }
        ]
    }
}
```

---

## Key Takeaways

### ✅ Always Follow This Pattern:

1. **Define type** in `_config.ts`
2. **Add to interface** in `HomePageContent`
3. **Provide fallback** in `homePageFallbackData`
4. **Create state** in `home-inputs.tsx`
5. **Add to save** in `handleSave()`
6. **Build admin UI** with CRUD operations
7. **Create component** to render data
8. **Import & use** in `page.tsx`

### ✅ Best Practices:

- **Always use unique IDs**: `id: \`item-${Date.now()}\``
- **Always sort by order**: `.sort((a, b) => (a.order || 0) - (b.order || 0))`
- **Handle empty states**: Check if array is empty
- **Use immutable updates**: `.map()` instead of direct mutation
- **Type everything**: Use TypeScript interfaces
- **Validate inputs**: Min/max for numbers, URL validation
- **Provide defaults**: Never leave fields undefined

### ✅ Common Patterns:

```typescript
// Update item in array
const updated = items.map(item =>
    item.id === targetId ? { ...item, field: newValue } : item
);

// Add item to array
const newItem = { id: `item-${Date.now()}`, ...defaults };
setItems([...items, newItem]);

// Remove item from array
const filtered = items.filter(item => item.id !== targetId);

// Reorder items
const sorted = items.slice().sort((a, b) => (a.order || 0) - (b.order || 0));
```

---

## Conclusion

This system provides:

✅ **Type Safety** - TypeScript catches errors at compile time  
✅ **Centralized Config** - All content structures in one place  
✅ **Database Persistence** - Content survives deploys  
✅ **Admin UI** - No code needed to manage content  
✅ **Reusability** - Same pattern for any content type  

**You can now create any dynamic content type** by following these 4 steps! 🎉

