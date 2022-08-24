import React from 'react';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {DesignForm, PageBody, PageHeader} from '../../components';
import {CREATE} from '../../utils/design';
import {Design} from '../../types';
import {notifyError, notifySuccess} from '../../utils';
import {useDesignForm} from '../../hooks/useDesignForm';

const DesignEdit = () => {
  const {store_hash, design_id} = useParams();
  const history = useHistory();
  const location = useLocation();
  const backLinkHref = location?.state?.backLinkHref ?? `/stores/${store_hash}`;

  const onSuccess = (design: Design) => {
    notifySuccess(`Your design was created.`);
    history.push(`/stores/${store_hash}/design/${design.id}`)
  }

  const onError = (message: string) => notifyError(message ?? `Your design could not be created.`);

  const [{design, onDesignChange, onSubmit, errors, isLoading}] = useDesignForm(
    `/api/stores/${store_hash}/blocks/${design_id}`,
    CREATE,
    onSuccess,
    onError
  );

  return (
    <>
      <PageHeader
        title="Create block"
        storeHash={store_hash}
        backLinkText="Blocks"
        backLinkHref={backLinkHref}
      />
      <PageBody>
        <DesignForm
          storeHash={store_hash}
          design={design}
          onChange={onDesignChange}
          onSubmit={onSubmit}
          errors={errors}
          isLoading={isLoading}
        />
      </PageBody>
    </>
  );
}

export {DesignEdit};
