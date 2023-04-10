describe("Tests for Lesson 23", () => {
    const desc = "<p>Array tests<p>";

    describe(desc, () => {
        it("Sum of array elements should be 67", () => {
            expect(arrSum).toBe(67);
        });

        it("Max element of array should be 10", () => {
            expect(max).toBe(10);
        });

        it("Min element of array should be 2", () => {
            expect(min).toBe(2);
        });
    });
});

describe("Tests for Lesson 26", () => {
    const desc = "<p>Functions tests<p>";

    describe(desc, () => {
        it("Should create accumulator object", () => {
            let acc = new Accumulator(3);
            expect(acc.value).toBe(3);
        });

        it("Should create cancelable accumulator object", () => {
            let cancelableAcc = new Accumulator(13);
            expect(cancelableAcc.value).toBe(13);
        });

        it("Value of the accumulator after operations is 6", () => {
            expect(accumulator.value).toBe(6);
        });

        it("Value of the cancelable accumulator after operations is 16", () => {
            expect(cancelableAccumulator.value).toBe(16);
        });

        it("Initial value of the cancelable accumulator is 15", () => {
            expect(cancelableAccumulator.initialValue).toBe(15);
        });
    });
});

describe("Test for Lesson 28", () => {
    const desc = "<p>Counter test<p>";

    describe(desc, () => {
        it("Clicked even number of times", () => {
            expect(clickCounter % 2 == 0).toBeTruthy();
        });
    });
});