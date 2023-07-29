const selectors = {
    customerAddresses: '[data-customer-addresses]',
    addressCountrySelect: '[data-address-country-select]',
    addressContainer: '[data-address]',
    toggleAddressButton: 'button[aria-expanded]',
    cancelAddressButton: 'button[type="reset"]',
    deleteAddressButton: 'button[data-confirm-message]',
};

const attributes = {
    expanded: 'aria-expanded',
    confirmMessage: 'data-confirm-message',
};

class CustomerAddresses {
    constructor() {
        this.elements = this._getElements();
        if (Object.keys(this.elements).length === 0) return;
        this._setupCountries();
        this._setupEventListeners();
    }

    _getElements() {
        const container = document.querySelector(selectors.customerAddresses);
        if (!container) return {};

        return {
            container,
            addressContainer: container.querySelector(selectors.addressContainer),
            toggleButtons: container.querySelectorAll(selectors.toggleAddressButton),
            cancelButtons: container.querySelectorAll(selectors.cancelAddressButton),
            deleteButtons: container.querySelectorAll(selectors.deleteAddressButton),
            countrySelects: container.querySelectorAll(selectors.addressCountrySelect),
        };
    }

    _setupCountries() {
        if (typeof Shopify !== 'undefined' && Shopify.CountryProvinceSelector) {
            new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
                hideElement: 'AddressProvinceContainerNew',
            });

            this.elements.countrySelects.forEach((select) => {
                const formId = select.dataset.formId;
                new Shopify.CountryProvinceSelector(`AddressCountry_${formId}`, `AddressProvince_${formId}`, {
                    hideElement: `AddressProvinceContainer_${formId}`,
                });
            });
        }
    }

    _setupEventListeners() {
        this.elements.toggleButtons.forEach((element) => {
            element.addEventListener('click', () => this._toggleExpanded(element));
        });

        this.elements.cancelButtons.forEach((element) => {
            element.addEventListener('click', () => this._toggleExpanded(element.closest(selectors.addressContainer).querySelector(`[${attributes.expanded}]`)));
        });

        this.elements.deleteButtons.forEach((element) => {
            element.addEventListener('click', () => this._handleDeleteButtonClick(element));
        });
    }

    _toggleExpanded(target) {
        const expanded = target.getAttribute(attributes.expanded) === 'false';
        target.setAttribute(attributes.expanded, expanded.toString());
    }

    _handleDeleteButtonClick(currentTarget) {
        if (confirm(currentTarget.getAttribute(attributes.confirmMessage))) {
            Shopify.postLink(currentTarget.dataset.target, {
                parameters: {
                    _method: 'delete'
                },
            });
        }
    }
}