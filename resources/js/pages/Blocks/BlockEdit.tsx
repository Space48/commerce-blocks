import React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ContentLoading, PageBody, PageHeader} from '../../components';
import {UPDATE} from '../../utils/block';
import {useBlock, useBlockForm, useChannels, useDesigns} from '../../hooks';
import {notifyError, notifySuccess} from '../../utils';
import {useSnippet} from '../../hooks/useSnippet';
import {BlockForm} from '../../components/BlockForm';

const BlockEdit = () => {
  const {store_hash, block_id} = useParams();
  const location = useLocation();
  const backLinkHref = location?.state?.backLinkHref ?? `/stores/${store_hash}`;
  
  const [initialBlock, blockError, blockIsLoading] = useBlock(store_hash, block_id);
  const [snippet, snippetError, snippetIsLoading] = useSnippet(store_hash, block_id);
  const [designs, designError, isDesignsLoading] = useDesigns(store_hash);

  const onSuccess = () => notifySuccess(`Your block was updated.`);
  const onError = (message: string) => notifyError(message ?? `Your block could not be updated.`);

  const [{block: blockUpdates, onBlockChange, onSubmit, errors, isLoading}] = useBlockForm(
    `/api/stores/${store_hash}/blocks/${block_id}`,
    UPDATE,
    onSuccess,
    onError
  );

  const block = {...initialBlock, ...blockUpdates};

  const [channelsResponse, channelsError, channelsIsLoading] = useChannels(store_hash);
  const channels = channelsResponse?.data ?? [];
  const channelsErrorMessage = channelsError?.response?.data?.error ?? null;

  return (
    <>
      <PageHeader
        title={block?.name ?? 'Update block'}
        storeHash={store_hash}
        backLinkText="Blocks"
        backLinkHref={backLinkHref}
      />
      <PageBody>
        <ContentLoading
          loading={blockIsLoading || channelsIsLoading || snippetIsLoading || isDesignsLoading}
          error={blockError ?? channelsErrorMessage ?? snippetError ?? designError ?? null}
        >
          <BlockForm
            blockId={block_id}
            storeHash={store_hash}
            channels={channels}
            block={block}
            designs={designs}
            snippet={snippet}
            onChange={onBlockChange}
            onSubmit={onSubmit}
            errors={errors}
            isLoading={isLoading || channelsIsLoading}
          />
        </ContentLoading>
      </PageBody>
    </>
  );
}

export {BlockEdit};
