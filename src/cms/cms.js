import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'
import withStyledComponentsRendered from './StylesheetInjector'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)
CMS.registerPreviewTemplate(
  'index',
  withStyledComponentsRendered(IndexPagePreview)
)
// CMS.registerPreviewTemplate('index', IndexPagePreview)
