import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { Pane, Button, Text, Heading, Link, Icon, Badge } from 'evergreen-ui';

import RunButton from '../runButton';
import { AppContext } from '../../context/AppContext';
import fetch from 'isomorphic-unfetch';

class Header extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    fetch(
      '//raw.githubusercontent.com/anikethsaha/htmllinter/master/playground/package.json'
    )
      .then((res) => res.json())
      .then((pkg) => this.context.setPlaygroundInfo(pkg));
  }

  render() {
    return (
      <header>
        <style jsx>{`
          header {
            height: 3rem;
          }
        `}</style>
        <Pane
          display="flex"
          paddingX={16}
          background="#F4F5F7"
          borderRadius={3}
          style={{ height: 'inherit' }}
        >
          <Pane flex={1} alignItems="center" display="flex">
            <Button
              marginRight={12}
              height={32}
              style={{
                background: '#0052cc',
                color: 'white',
                fontSize: '1rem',
              }}
              onClick={() => this.context.setConfigPanel(true)}
            >
              <Icon icon="settings" margin={5} />
              Edit Config
            </Button>
            <Heading size={600} style={{ letterSpacing: '.1rem' }}>
              HtmlLinter PlayGround
            </Heading>
            <Badge color="yellow" isSolid margin={10} marginY={15}>
              <code>v{this.context.playgroundInfo.version || ''}</code>
            </Badge>
          </Pane>
          <Pane flex={1} alignItems="center" display="flex">
            <RunButton />
          </Pane>
          <Pane>
            <Pane>
              <Pane flex={1} alignItems="center" padding={8} display="flex">
                <Link
                  href="https://github.com/anikethsaha/htmllinter"
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    marginRight={16}
                    style={{
                      fontSize: '1rem',
                      background: '#0052cc',
                      color: 'white',
                    }}
                  >
                    Github
                  </Button>
                </Link>
              </Pane>
              {/* Below you can see the marginRight property on a Button. */}
            </Pane>
          </Pane>
        </Pane>
      </header>
    );
  }
}

export default Header;
