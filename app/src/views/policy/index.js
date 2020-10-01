import React, {lazy, Suspense} from 'react'
import PropTypes from 'prop-types';
import Page from 'src/components/Page';

const Content = lazy(() => import(
  '!babel-loader!mdx-loader!./Content.mdx'
))

const Policy = () => {
    return (
      <Page>
        <Suspense fallback={null}>
          <Content />
        </Suspense>

      </Page>
    );
}



export default Policy