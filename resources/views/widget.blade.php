<div
    class="s48-commerce-blocks"
    data-api-url="{{ $apiUrl }}"
    data-store-hash="{{ $storeHash }}"
    @{{#if block_id}}
    data-block-id="@{{block_id}}"
    @{{/if}}
>
</div>
@vite('frontend/resources/js/index.tsx', 'frontend/build')
