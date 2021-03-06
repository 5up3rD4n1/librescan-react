// TODO: Translate error messages

import { Observable } from 'rxjs';

const BASE_URL = "/api";
const SERVER_URL = "http://localhost:8080";

const getJson = (method, url, body = {}) => {
  const requestSettings = {
    url: `${SERVER_URL}${BASE_URL}${url}`,
    crossDomain: true,
    responseType: 'json',
    method,
    body,
  };

  return Observable.ajax(requestSettings);
};

export const projects = (projectId) => {
  const url = projectId ? `/projects/${projectId}` : "/projects";
  return getJson("GET", url);
};

export const images = (projectId) => {
  if (!projectId) throw "ProjectId is required to fetch images";
  const url = `/projects/${projectId}/images`;
  return getJson("GET", url);
};

export const createImages = (projectId) => {
  if (!projectId) throw "ProjectId is required to create new images";
  const url = `/projects/${projectId}/images`;
  return getJson("POST", url);
};

export const generateOutputs = (projectId) => {
  if (!projectId) throw "ProjectId is required to generate the output";
  const url = `/projects/${projectId}/outputs`;
  return getJson("POST", url);
};

export const formsMetadata = (formId) => {
  let url = '/preferences/forms';
  url = formId? `${url}?form=${formId}` : url;
  return getJson("GET", url);
};

export const buildThumbnailUrl = (projectId, imageId, width=100, height=100) => {
  return `${SERVER_URL}${BASE_URL}/projects/${projectId}/thumbnails/${imageId}?width=${width}&height=${height}`
};

export const buildTifUrl = (projectId, imageId, width=100, height=100) => {
  return `${SERVER_URL}${BASE_URL}/projects/${projectId}/tifs/${imageId}?width=${width}&height=${height}`
};

export const buildPDFUrl = (projectId) => {
  return `${SERVER_URL}${BASE_URL}/projects/${projectId}/outputs/pdf`
};
