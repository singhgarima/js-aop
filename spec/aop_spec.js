describe("aop", function () {

    var CommandAspect, Dish;
    
    CommandAspect = function () {};
    CommandAspect.give = function () {};

    beforeEach(function () {
        Dish = function (name, cuisine) {
            this.name = name;
            this.cuisine = cuisine;
        };

        Dish.prototype.serve = function(first_argument) {
            return "Dish " + this.name + " is now served. This belongs to the " + this.cuisine + " cuisine.";
        };

        spyOn(CommandAspect, 'give');
    });

    describe('after', function () {

        var rajma;

        beforeEach(function() {
            rajma = new Dish('rajma', 'Indian');
        });

        it('should apply aspect after function call', function () {
            var message = "The dish is now served. Please clean your plates once your are finished.";
            Dish.after('serve', function () {
                CommandAspect.give(message);
            });

            rajma.serve();

            expect(CommandAspect.give).toHaveBeenCalledWith(message);
        });

        it('should ensure correct functioning of original function', function() {
            Dish.after('serve', function () {});

            output = rajma.serve();

            expect(output).toBe("Dish rajma is now served. This belongs to the Indian cuisine.");
        });

    });

    describe('before', function () {

        var pizza;

        beforeEach(function() {
            pizza = new Dish('pizza', 'Italian');
        });

        it('should apply aspect before function call', function () {
            var message = "The dish will soon be served.";
            Dish.before('serve', function () {
                CommandAspect.give(message);
            });

            pizza.serve();

            expect(CommandAspect.give).toHaveBeenCalledWith(message);
        });

        it('should ensure correct functioning of original function', function() {
            Dish.before('serve', function () {});

            output = pizza.serve();

            expect(output).toBe("Dish pizza is now served. This belongs to the Italian cuisine.");
        });

    });

    describe('around', function () {

        var burger;

        beforeEach(function() {
            burger = new Dish('burger', 'Fast Food');
        });

        it('should apply aspect before function call', function () {
            var messageBefore = "Before";
            var messageAfter = "After";
            Dish.around('serve', function () {
                CommandAspect.give(messageBefore);
            }, function () {
                CommandAspect.give(messageAfter)
            });

            burger.serve();

            expect(CommandAspect.give.calls.all()[0].args).toEqual([messageBefore]);
            expect(CommandAspect.give.calls.all()[1].args).toEqual([messageAfter]);
        });

        it('should ensure correct functioning of original function', function() {
            Dish.around('serve', function () {}, function () {});

            output = burger.serve();

            expect(output).toBe("Dish burger is now served. This belongs to the Fast Food cuisine.");
        });

    });

});