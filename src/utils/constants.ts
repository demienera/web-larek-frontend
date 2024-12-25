import { EventEmitter } from '../components/base/events';
import { AppData } from '../components/model/AppData';
import { ProductApi } from '../components/ProductApi';
import { Basket } from '../components/view/Basket';
import { ContactsForm } from '../components/view/ContactsForm';
import { DeliveryForm } from '../components/view/DeliveryForm';
import { Modal } from '../components/view/Modal';
import { Page } from '../components/view/Page';
import { cloneTemplate, ensureElement } from './utils';

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const api = new ProductApi(CDN_URL, API_URL);
export const events = new EventEmitter();
export const appData = new AppData({}, events);

export const catalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
export const productPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
export const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
export const basketItemTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
export const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
export const deliveryFormTemplate = ensureElement<HTMLTemplateElement>('#order');
export const successTemplate = ensureElement<HTMLTemplateElement>('#success');
export const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

export const page = new Page(document.body, events);
export const basket = new Basket(cloneTemplate(basketTemplate), events);
export const deliveryForm = new DeliveryForm(cloneTemplate(deliveryFormTemplate), events);
export const contactsForm = new ContactsForm(cloneTemplate(contactsFormTemplate), events);