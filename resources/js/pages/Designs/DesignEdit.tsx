import React, {useEffect} from 'react';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {ContentLoading, DesignForm, PageBody, PageHeader} from '../../components';
import {UPDATE} from '../../utils/design';
import {Design} from '../../types';
import {notifyError, notifySuccess} from '../../utils';
import {useDesignForm} from '../../hooks/useDesignForm';
import {useDesign} from '../../hooks';

const DesignEdit = () => {
  const {store_hash, design_id} = useParams();
  const history = useHistory();
  const location = useLocation();
  const backLinkHref = location?.state?.backLinkHref ?? `/stores/${store_hash}?tab=designs`;
  const [initialDesign, designError, isDesignLoading] = useDesign(store_hash, design_id);

  const onSuccess = (design: Design) => {
    notifySuccess(`Your design was updated.`);
  }

  const onError = (message: string) => notifyError(message ?? `Your design could not be updated.`);

  const [{design, setDesign, onDesignChange, onSubmit, errors, isLoading}] = useDesignForm(
    `/api/stores/${store_hash}/designs/${design_id}`,
    UPDATE,
    onSuccess,
    onError
  );

  useEffect(() => {
    if (initialDesign !== undefined) {
      setDesign(initialDesign);
    }
  }, [initialDesign])

  return (
    <>
      <PageHeader
        title={design?.name ? `Edit ${design.name}` : 'Edit design'}
        storeHash={store_hash}
        backLinkText="Designs"
        backLinkHref={backLinkHref}
      />
      <PageBody>
        <ContentLoading
          loading={isDesignLoading}
          error={designError ?? null}
        >
          <DesignForm
            designId={design_id}
            storeHash={store_hash}
            design={design}
            onChange={onDesignChange}
            onSubmit={onSubmit}
            errors={errors}
            isLoading={isLoading}
          />
        </ContentLoading>
      </PageBody>
    </>
  );
}

export {DesignEdit};
