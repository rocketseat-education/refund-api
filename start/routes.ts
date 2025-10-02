/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const RefundsController = () => import('#controllers/refunds_controller')

router.resource('refunds', RefundsController).only(['index', 'store', 'show', 'destroy'])
