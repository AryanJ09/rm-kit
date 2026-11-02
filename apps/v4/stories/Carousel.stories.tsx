// Hand-written. Not generated: edit this file directly.
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/rm-style/ui/carousel"

// Hand-written. The RM Kit carousel: a row of cards you move through, with previous and next controls.
const meta = { title: "RM Kit/Carousel", tags: ["autodocs"], parameters: { layout: "padded" } } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const slides = ["Equity", "Fixed income", "Cash"]
export const Playground: Story = {
  render: () => (
    <Carousel className="w-(--size-layout-frame-width) max-w-(--size-share-full) px-(--spacing-group)">
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s} className="basis-(--size-share-max)">
            <div className="rounded-(--radius-lg) border-(length:--border-width-default) border-border bg-card p-(--spacing-inline-lg) text-(length:--font-size-sm)">{s}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
