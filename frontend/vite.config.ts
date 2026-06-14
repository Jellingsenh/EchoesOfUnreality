import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { baseWebUrl } from './resources/constants'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: baseWebUrl,
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        account: '/routes/account.html',
        signup: '/routes/account/signup.html',
        login: '/routes/account/login.html',
        resetpassword: '/routes/account/resetpassword.html',
        gamemanagement: '/routes/gamemanagement.html',
        locations: '/routes/gamemanagement/locations.html',
        characters: '/routes/gamemanagement/characters.html',
        gmcombat: '/routes/gamemanagement/combat.html',
        gmexploration: '/routes/gamemanagement/exploration.html',
        items: '/routes/gamemanagement/items.html',
        plotnotes: '/routes/gamemanagement/plotnotes.html',
        playerview: '/routes/playerview.html',
        character: '/routes/playerview/character.html',
        playercombat: '/routes/playerview/combat.html',
        playerexploration: '/routes/playerview/exploration.html',
        crew: '/routes/playerview/crew.html',
        rules: '/routes/rules.html',
        tips: '/routes/rules/tips.html',
        support: '/routes/support.html',
        subscribe: '/routes/support/subscribe.html',
        donate: '/routes/support/donate.html',
        contact: '/routes/support/contact.html',
      },
    },
  },
})
