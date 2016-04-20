'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _history = require('history');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by wangxunxun on 2016/4/18.
 */


var BlogApp = _react2.default.createClass({
    displayName: 'BlogApp',

    render: function render() {
        var pathname = this.props.location.pathname;
        return _react2.default.createElement(
            'div',
            { className: 'blog-app' },
            _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { activeClassName: 'active', to: '/archives' },
                        'Archives'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { activeClassName: 'active', to: '/about' },
                        'About'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { activeClassName: 'active', to: '/signIn' },
                        'Sign in'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { activeClassName: 'active', to: '/signOut' },
                        'Sign out'
                    )
                )
            ),
            _react2.default.cloneElement(this.props.children || _react2.default.createElement('div', null), { key: pathname })
        );
    }
});

var About = _react2.default.createClass({
    displayName: 'About',

    render: function render() {
        return _react2.default.createElement(
            'div',
            { className: 'about' },
            _react2.default.createElement(
                'h1',
                null,
                'About author'
            )
        );
    }
});

var Archives = _react2.default.createClass({
    displayName: 'Archives',

    render: function render() {
        return _react2.default.createElement(
            'div',
            null,
            '原创：',
            _react2.default.createElement('br', null),
            this.props.original,
            '转载：',
            _react2.default.createElement('br', null),
            this.props.reproduce
        );
    }
});

var Original = _react2.default.createClass({
    displayName: 'Original',

    render: function render() {
        return _react2.default.createElement(
            'div',
            { className: 'archives' },
            _react2.default.createElement(
                'ul',
                null,
                window.blogData.slice(0, 4).map(function (item, index) {
                    return _react2.default.createElement(
                        'li',
                        { key: index },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            {
                                to: '/article/' + index,
                                query: { type: 'Original' },
                                state: { title: item.title }
                            },
                            item.title
                        )
                    );
                })
            )
        );
    }
});

var Reproduce = _react2.default.createClass({
    displayName: 'Reproduce',

    render: function render() {
        return _react2.default.createElement(
            'div',
            { className: 'archives' },
            _react2.default.createElement(
                'ul',
                null,
                window.blogData.slice(4, 8).map(function (item, index) {
                    return _react2.default.createElement(
                        'li',
                        { key: index },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            {
                                to: '/article/' + index,
                                query: { type: 'Reproduce' },
                                state: { title: item.title },
                                hash: '#hash'
                            },
                            item.title
                        )
                    );
                })
            )
        );
    }
});

var Article = _react2.default.createClass({
    displayName: 'Article',

    render: function render() {
        var id = this.props.params.id;
        var location = this.props.location;
        return _react2.default.createElement(
            'div',
            { className: 'article' },
            _react2.default.createElement(
                'h2',
                null,
                location.state.title
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            '这是文档归档 ',
            location.query.type,
            ' 类目下的第 ',
            ++id,
            ' 篇文章，欢迎你的访问！'
        );
    }
});

var SignIn = _react2.default.createClass({
    displayName: 'SignIn',

    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var email = _react2.default.findDOMNode(this.refs.name).value;
        var pass = _react2.default.findDOMNode(this.refs.pass).value;
        if (pass !== 'password') {
            return;
        }
        localStorage.setItem('login', 'true');

        var location = this.props.location;

        if (location.state && location.state.nextPathname) {
            this.props.history.replaceState(null, location.state.nextPathname);
        } else {
            this.props.history.replaceState(null, '/about');
        }
    },

    render: function render() {
        if (hasLogin()) {
            return _react2.default.createElement(
                'p',
                null,
                '你已经登录系统！',
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/signOut' },
                    '点此退出'
                )
            );
        }
        return _react2.default.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', { ref: 'name' })
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', { ref: 'pass' })
            ),
            ' (password)',
            _react2.default.createElement('br', null),
            _react2.default.createElement(
                'button',
                { type: 'submit' },
                '登录'
            )
        );
    }
});
var SignOut = _react2.default.createClass({
    displayName: 'SignOut',

    componentDidMount: function componentDidMount() {
        localStorage.setItem('login', 'false');
    },

    render: function render() {
        return _react2.default.createElement(
            'p',
            null,
            '已经退出！'
        );
    }
});

function hasLogin() {
    return localStorage.getItem('login') === 'true';
}

function requireAuth(nextState, replaceState) {
    if (!hasLogin()) {
        replaceState({ nextPathname: nextState.location.pathname }, '/signIn');
    }
}

_react2.default.render(_react2.default.createElement(
    _reactRouter.Router,
    null,
    _react2.default.createElement(
        _reactRouter.Route,
        { path: '/', component: BlogApp },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: SignIn }),
        _react2.default.createElement(_reactRouter.Route, { path: 'signIn', component: SignIn }),
        _react2.default.createElement(_reactRouter.Route, { path: 'signOut', component: SignOut }),
        _react2.default.createElement(_reactRouter.Redirect, { from: '/archives', to: '/archives/posts' }),
        _react2.default.createElement(
            _reactRouter.Route,
            { onEnter: requireAuth, path: '/archives', component: Archives },
            _react2.default.createElement(_reactRouter.Route, { path: 'posts', components: {
                    original: Original,
                    reproduce: Reproduce
                } })
        ),
        _react2.default.createElement(_reactRouter.Route, { path: 'article/:id', component: Article }),
        _react2.default.createElement(_reactRouter.Route, { path: 'about', component: About })
    )
), document.getElementById('example'));
