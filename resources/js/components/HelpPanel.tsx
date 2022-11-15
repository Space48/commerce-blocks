import React, {useContext} from 'react';
import {Button, H2, Link, Panel, Text} from '@bigcommerce/big-design';
import {useHelpScoutBeacon} from '../hooks';
import ConfigContext from '../context/ConfigContext';

const HelpPanel = () => {
  const [startChat] = useHelpScoutBeacon();
  const context = useContext(ConfigContext);

  return (
    <>
      <Panel>
        <H2>Browse our documentation</H2>
        <Text>
          Please go to our support site to find our{' '}
          <Link
            target="_blank"
            external={true}
            href={context?.supportDocsUrl}>
            user guide
          </Link>
          {' '}and{' '}
          <Link
            target="_blank"
            external={true}
            href={context?.supportDocsFAQUrl}>
            FAQs
          </Link>.
        </Text>
        <Button onClick={() => {
          window.open(context?.supportDocsUrl);
        }}>Read support docs</Button>
      </Panel>
      <Panel>
        <H2>Ask us a question</H2>
        <Text>
          If something isn&apos;t clear to you or something doesn&apos;t seem right, please get in touch.
          You can email us at {' '}<Link href={'mailto: ' + context?.supportEmail}>{context?.supportEmail}</Link>
          {' '}or
          {' '}<Link onClick={startChat}>start a live chat</Link> with us.
        </Text>
        <Button onClick={startChat}>Start live chat</Button>
      </Panel>
    </>
  )
};

export default HelpPanel;
