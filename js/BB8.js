var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// I've seen a few of these BB-8 animations about, so I thought I'd take a shot at building one using React as a bit of an exercise. My favorite thing to do is draw circles around him to make him do a little jig, but I'm easily amused.

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            droidX: 0,
            mouseX: 0,
            toTheRight: true,
            speed: 2,
            accelMod: 1
        };
        return _this;
    }

    // Keep track of the mouse position.


    _createClass(App, [{
        key: 'handleMouseMove',
        value: function handleMouseMove(event) {
            this.setState({
                mouseX: event.pageX
            });
        }

        // Speed Mod Bar

    }, {
        key: 'handleSpeedChange',
        value: function handleSpeedChange(e) {
            if (parseFloat(e.target.value)) {
                this.setState({
                    speed: e.target.value
                });
            }
        }

        // Acceleration Mod Bar

    }, {
        key: 'handleAccelChange',
        value: function handleAccelChange(e) {
            if (parseFloat(e.target.value)) {
                this.setState({
                    accelMod: e.target.value
                });
            }
        }

        // Get moving!

    }, {
        key: 'movement',
        value: function movement() {
            var _state = this.state,
                droidX = _state.droidX,
                mouseX = _state.mouseX,
                speed = _state.speed,
                accelMod = _state.accelMod;

            // Need a pretty strict if statement to make sure React doesn't end up in a 
            // render loop with all the state changes / re-rendering going on.

            if (Math.abs(Math.round(droidX) - mouseX) !== 1) {

                var distance = mouseX - droidX;
                var acceleration = Math.abs(distance * accelMod) / 100;

                // Move to the right
                if (droidX < mouseX) {
                    this.setState({
                        droidX: droidX + speed * acceleration,
                        toTheRight: true
                    });
                }

                // Move to the left
                else {
                        this.setState({
                            droidX: droidX - speed * acceleration,
                            toTheRight: false
                        });
                    }
            }
        }

        // Get some initial movement on first mount. 

    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({
                mouseX: 300
            });
        }

        // Set up the mouse event listener and fire up the movement function.

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            document.addEventListener('mousemove', function (e) {
                return _this2.handleMouseMove(e);
            });
            setInterval(this.movement.bind(this), 1);
        }

        // Clean up.

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _this3 = this;

            document.removeEventListener('mousemove', function (e) {
                return _this3.handleMouseMove(e);
            });
        }

        // Away we go.

    }, {
        key: 'render',
        value: function render() {
            var _state2 = this.state,
                speed = _state2.speed,
                accelMod = _state2.accelMod,
                droidX = _state2.droidX,
                mouseX = _state2.mouseX,
                toTheRight = _state2.toTheRight;


            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'bb8', style: { WebkitTransform: 'translateX(' + droidX + 'px)' } },
                    React.createElement(
                        'div',
                        { className: 'antennas ' + (toTheRight ? 'right' : ''),
                            style: { WebkitTransform: 'translateX(' + (mouseX - droidX) / 25 + 'px) rotateZ(' + (mouseX - droidX) / 80 + 'deg)' } },
                        React.createElement('div', { className: 'antenna short' }),
                        React.createElement('div', { className: 'antenna long' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'head-bb8',
                            style: { WebkitTransform: 'translateX(' + (mouseX - droidX) / 15 + 'px) rotateZ(' + (mouseX - droidX) / 25 + 'deg)' } },
                        React.createElement('div', { className: 'stripe one' }),
                        React.createElement('div', { className: 'stripe two' }),
                        React.createElement(
                            'div',
                            { className: 'eyes ' + (toTheRight ? 'right' : '') },
                            React.createElement('div', { className: 'eye one' }),
                            React.createElement('div', { className: 'eye two' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'stripe detail ' + (toTheRight ? 'right' : '') },
                            React.createElement('div', { className: 'detail zero' }),
                            React.createElement('div', { className: 'detail zero' }),
                            React.createElement('div', { className: 'detail one' }),
                            React.createElement('div', { className: 'detail two' }),
                            React.createElement('div', { className: 'detail three' }),
                            React.createElement('div', { className: 'detail four' }),
                            React.createElement('div', { className: 'detail five' }),
                            React.createElement('div', { className: 'detail five' })
                        ),
                        React.createElement('div', { className: 'stripe three' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'ball', style: { WebkitTransform: 'rotateZ(' + droidX / 2 + 'deg)' } },
                        React.createElement('div', { className: 'lines one' }),
                        React.createElement('div', { className: 'lines two' }),
                        React.createElement('div', { className: 'ring one' }),
                        React.createElement('div', { className: 'ring two' }),
                        React.createElement('div', { className: 'ring three' })
                    ),
                    React.createElement('div', { className: 'shadow' })
                ),
                React.createElement(
                    'div',
                    { className: 'instructions' },
                    React.createElement(
                        'p',
                        null,
                        'move your mouse.'
                    )
                )
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));