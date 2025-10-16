describe('Arithmetic', function () {
    describe('Validation', function () {
        it('rejects missing operation', function (done) {
            request.get('/arithmetic?operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Unspecified operation" });
                    done();
                });
        });
        it('rejects invalid operation', function (done) {
            request.get('/arithmetic?operation=foobar&operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operation: foobar" });
                    done();
                });
        });
        it('rejects missing operand1', function (done) {
            request.get('/arithmetic?operation=add&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: undefined" });
                    done();
                });
        });
        it('rejects operands with invalid sign', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2-1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: 4.2-1" });
                    done();
                });
        });
        it('rejects operands with invalid decimals', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2.1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: 4.2.1" });
                    done();
                });
        });
    });

    describe('Addition', function () {
        it('adds two positive integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('adds zero to an integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('adds a negative integer to a positive integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -21 });
                    done();
                });
        });
        it('adds two negative integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -42 });
                    done();
                });
        });
        it('adds an integer to a floating point number', function (done) {
            request.get('/arithmetic?operation=add&operand1=2.5&operand2=-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -2.5 });
                    done();
                });
        });
        it('adds with negative exponent', function (done) {
            request.get('/arithmetic?operation=add&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
    });

// TODO: Challenge #1
describe('Power Function', function () {
    it('calculates power of a positive integer', function (done) {
        request.get('/arithmetic?operation=power&operand1=2&operand2=3')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 8 });
                done();
            });
    });

    it('calculates power of zero', function (done) {
        request.get('/arithmetic?operation=power&operand1=0&operand2=5')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 0 });
                done();
            });
    });

    it('calculates power of a negative base', function (done) {
        request.get('/arithmetic?operation=power&operand1=-2&operand2=3')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: -8 });
                done();
            });
    });

    it('calculates power with a fractional exponent', function (done) {
        request.get('/arithmetic?operation=power&operand1=4&operand2=0.5')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.eql({ result: 2 });
                done();
            });
    });

    it('rejects negative exponent for zero base', function (done) {
        request.get('/arithmetic?operation=power&operand1=0&operand2=-1')
            .expect(400)
            .end(function (err, res) {
                expect(res.body).to.eql({ error: "Undefined result for 0 raised to a negative power" });
                done();
            });
    });
});

    describe('Multiplication', function () {
        it('multiplies two positive integers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('multiplies a positive integer with zero', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('multiplies a positive integer and negative integer', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -42 });
                    done();
                });
        });
        it('multiplies two negative integers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=-21&operand2=-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('multiplies two floating point numbers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=.5&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.25 });
                    done();
                });
        });
        it('multiplies supporting exponential notation', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=4.2e1&operand2=1e0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
    });

    describe('Division', function () {
        it('divides a positive integer by an integer factor ', function (done) {
            request.get('/arithmetic?operation=divide&operand1=42&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 21 });
                    done();
                });
        });
        it('divides a negative integer by an integer factor ', function (done) {
            request.get('/arithmetic?operation=divide&operand1=-42&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -21 });
                    done();
                });
        });
        it('divides a positive integer by a non-factor', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.5 });
                    done();
                });
        });
        it('divides a positive integer by a negative integer', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -0.5 });
                    done();
                });
        });
        it('divides zero by a positive integer', function (done) {
            request.get('/arithmetic?operation=divide&operand1=0&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('divides by zero', function (done) {
            request.get('/arithmetic?operation=divide&operand1=0.5&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.25 });
                    done();
                });
        });
        it('divides by zero', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: null });
                    done();
                });
        });
    });

    describe('Trigonometric Functions', function () {
        it('calculates sine of 30 degrees', function (done) {
            request.get('/arithmetic?operation=sin&operand1=30')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(0.5, 0.0001);
                    done();
                });
        });

        it('calculates cosine of 60 degrees', function (done) {
            request.get('/arithmetic?operation=cos&operand1=60')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(0.5, 0.0001);
                    done();
                });
        });

        it('calculates tangent of 45 degrees', function (done) {
            request.get('/arithmetic?operation=tan&operand1=45')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(1.0, 0.0001);
                    done();
                });
        });
    });

    describe('Logarithmic Functions', function () {
        it('calculates logarithm base 10 of 100', function (done) {
            request.get('/arithmetic?operation=log&operand1=100')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(2);
                    done();
                });
        });

        it('calculates natural logarithm of e', function (done) {
            request.get('/arithmetic?operation=ln&operand1=2.718281828')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(1.0, 0.0001);
                    done();
                });
        });
    });

    describe('Other Functions', function () {
        it('calculates square root of 16', function (done) {
            request.get('/arithmetic?operation=sqrt&operand1=16')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(4);
                    done();
                });
        });

        it('calculates factorial of 5', function (done) {
            request.get('/arithmetic?operation=factorial&operand1=5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.equal(120);
                    done();
                });
        });

        it('rejects factorial of negative number', function (done) {
            request.get('/arithmetic?operation=factorial&operand1=-1')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.include("Factorial requires non-negative integer");
                    done();
                });
        });

        it('rejects factorial of non-integer', function (done) {
            request.get('/arithmetic?operation=factorial&operand1=2.5')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body.error).to.include("Factorial requires non-negative integer");
                    done();
                });
        });
    });

    describe('History', function () {
        it('retrieves calculation history', function (done) {
            // First make a calculation
            request.get('/arithmetic?operation=add&operand1=10&operand2=5')
                .expect(200)
                .end(function (err, res) {
                    // Then get history
                    request.get('/history')
                        .expect(200)
                        .end(function (err, res) {
                            expect(res.body).to.have.property('history');
                            expect(res.body).to.have.property('total');
                            expect(res.body.history).to.be.an('array');
                            if (res.body.history.length > 0) {
                                expect(res.body.history[0]).to.have.property('operation', 'add');
                                expect(res.body.history[0]).to.have.property('operand1', '10');
                                expect(res.body.history[0]).to.have.property('operand2', '5');
                                expect(res.body.history[0]).to.have.property('result', 15);
                            }
                            done();
                        });
                });
        });

        it('clears calculation history', function (done) {
            request.delete('/history')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.message).to.equal("History cleared successfully");
                    done();
                });
        });
    });
});
