import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '../layouts/MainLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import IdeaVault from '../views/IdeaVault.vue'
import PromptGenerator from '../views/PromptGenerator.vue'
import ChallengeDeck from '../views/ChallengeDeck.vue'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            { path: '', name: 'Dashboard', component: Dashboard },
            { path: 'vault', name: 'IdeaVault', component: IdeaVault },
            { path: 'tools/prompts', name: 'PromptGenerator', component: PromptGenerator },
            { path: 'tools/challenges', name: 'ChallengeDeck', component: ChallengeDeck },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
