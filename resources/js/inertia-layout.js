const PLUGIN_NAME = 'vite:inertia:layout'
const TEMPLATE_LAYOUT_REGEX = /<template +layout(?: *= *['"]([-_\w\/]+)['"] *)?>/

/**
 * A basic Vite plugin that adds a <template layout="name"> syntax to Vite SFCs.
 * It must be used before the Vue plugin.
 */
export default (path = '@/layouts') => ({
    name: PLUGIN_NAME,
    transform: code => {
        if (!TEMPLATE_LAYOUT_REGEX.test(code)) {
            return
        }

        return code.replace(TEMPLATE_LAYOUT_REGEX, (_, layoutName) => `
            <script>
            import layout from '${path}/${layoutName ?? 'default'}.vue'
            export default { layout }
            </script>
            <template>
        `)
    },
})
