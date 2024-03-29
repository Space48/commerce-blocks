import React from 'react';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {ContentLoading, PageBody, PageHeader} from '../../components';
import {CREATE} from '../../utils/block';
import {useBlockForm, useChannels, useCurrencies, useDesigns} from '../../hooks';
import {Block} from '../../types';
import {notifyError, notifySuccess} from '../../utils';
import {BlockForm} from '../../components/BlockForm';

const BlockCreate = () => {
  const {store_hash} = useParams();
  const history = useHistory();
  const location = useLocation();
  const backLinkHref = location?.state?.backLinkHref ?? `/stores/${store_hash}`;

  const onSuccess = (block: Block) => {
    notifySuccess(`Your block was created.`);
    history.push(`/stores/${store_hash}/blocks/${block.id}`)
  }

  const onError = (message: string) => notifyError(message ?? `Your block could not be created.`);

  const [{block, onBlockChange, onSubmit, errors, isLoading}] = useBlockForm(
    `/api/stores/${store_hash}/blocks`,
    CREATE,
    onSuccess,
    onError
  );

  const [channelsResponse, channelsError, channelsIsLoading] = useChannels(store_hash);
  const [currencies, currenciesError, currenciesIsLoading] = useCurrencies(store_hash);

  const channels = channelsResponse?.data ?? [];
  const channelsErrorMessage = channelsError?.response?.data?.error ?? null;

  const [designs, designError, designsIsLoading] = useDesigns(store_hash);

  return (
    <>
      <PageHeader
        title="Create block"
        backLinkText="Blocks"
        backLinkHref={backLinkHref}
      />
      <PageBody>
        <ContentLoading
          loading={isLoading || channelsIsLoading || designsIsLoading || currenciesIsLoading}
          error={channelsErrorMessage ?? designError ?? currenciesError ?? null}
        >
          <BlockForm
            storeHash={store_hash}
            channels={channels}
            block={block}
            designs={designs}
            onChange={onBlockChange}
            onSubmit={onSubmit}
            errors={errors}
            isLoading={isLoading || channelsIsLoading}
            currencies={currencies}
          />
        </ContentLoading>
      </PageBody>
    </>
  );
}

export {BlockCreate};
