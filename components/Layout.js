import Link from 'next/link';
import Head from 'next/head';
import css from 'styled-jsx/css';

import Loading from '../components/Loading/Loading';
import SVGLogo from './SVGLogo/SVGLogo';

const visible = css`
  .visibility {
    display: flex;
  }
`;

const hidden = css`
  .visibility {
    display: none;
  }
`;

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      transition: false,
    };
  }
  componentDidMount() {
    this.handlePageLoad();
  }

  handlePageLoad() {
    this.setState({
      transition: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 3000);
    setTimeout(() => {
      this.setState({
        transition: false,
      });
    }, 2800);
  }
  render() {
    const { title, children } = this.props;
    const { loading, transition } = this.state;
    const loadingComponent = loading ? (
      <Loading transition={transition} />
    ) : null;
    const showHeader = loading ? hidden : visible;
    return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        {loadingComponent}
        <header className="visibility">
          <nav>
            <Link prefetch href="/">
              <a>
                <SVGLogo />
                <p className="color-grey"> tonypettigrew.com</p>
              </a>
            </Link>

            <Link prefetch href="/about">
              <a className="color-yellow">
                <img src="/static/about.svg" alt="about me" />
                about me
              </a>
            </Link>
            <Link prefetch href="/demonstrations">
              <a className="color-red">
                {' '}
                <img src="/static/demo.svg" alt="about me" /> demonstrations
              </a>
            </Link>
            <Link prefetch href="/blog">
              <a className="color-blue">
                {' '}
                <img src="/static/blog.svg" alt="blog" />
                opinions
              </a>
            </Link>
          </nav>
        </header>

        {loading || children}
        <style jsx>{showHeader}</style>
        <style jsx>
          {`
            header {
              background: #131313;
              display: flex;
              justify-content: center;
              z-index: 10;
            }

            nav {
              display: flex;
              justify-content: space-between;
              padding: 0.5em 0;
              width: 86vw;
            }
            nav a {
              text-decoration: none;
              font-size: 1.5rem;
              transition: color 0.15s ease-out;
              display: flex;
              align-items: center;
            }

            nav a img {
              transition: opacity 0.1s ease-out;
            }

            nav a:hover,
            nav a:focus {
              color: #565656;
            }

            nav a:hover img,
            nav a:focus img {
              opacity: 0.3;
            }

            .color-yellow img {
              height: 1em;
            }

            .color-yellow {
              color: rgba(253, 239, 132, 1);
            }

            .color-red img {
              height: 2em;
            }

            .color-red {
              color: rgba(247, 198, 169, 1);
            }

            .color-blue img {
              height: 1.2em;
              margin-right: 0.2em;
            }

            .color-blue {
              color: rgba(21, 186, 196, 1);
            }
            .color-grey {
              color: #565656;
            }

            p.color-grey {
              margin: 0;
            }
          `}
        </style>
        <style global jsx>
          {`
            body {
              margin: 0;
              padding: 0;
              background: #131313;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Layout;
