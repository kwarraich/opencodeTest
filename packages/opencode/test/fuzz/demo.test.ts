import { test, expect } from "bun:test"
import fc from "fast-check"

// small function to fuzz: square root that rejects negative numbers
function squareRoot(value: number): number
{
  if (value < 0)
  {
    throw new Error("negative input")
  }
  return Math.sqrt(value)
}

// property: for any non-negative number, squareRoot should not throw
test("squareRoot never throws on non-negative input", () =>
{
  fc.assert(
    fc.property(fc.double({ min: 0, noNaN: true }), (value) =>
    {
      squareRoot(value)
    }),
  )
})

// property: negative input should always throw
test("squareRoot always throws on negative input", () =>
{
  fc.assert(
    fc.property(fc.double({ max: -Number.MIN_VALUE, noNaN: true }), (value) =>
    {
      expect(() => squareRoot(value)).toThrow()
    }),
  )
})

// property: repeating text N times gives a string N times as long
test("repeat length is right", () =>
{
  fc.assert(
    fc.property(fc.string(), fc.nat({ max: 50 }), (text, times) =>
    {
      expect(text.repeat(times).length).toBe(text.length * times)
    }),
  )
})
