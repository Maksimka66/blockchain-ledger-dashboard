import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default [
    {
        root: true,
        env: {
            browser: true,
            es2021: true,
            node: true
        },
        parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: '@babel/eslint-parser',
                ecmaVersion: 2020,
                sourceType: 'module'
            }
        },
        plugins: {
            vue: vuePlugin
        },
        extends: [
            'eslint:recommended',
            '@vue/eslint-config-typescript',
            'plugin:vue/vue3-essential',
            'plugin:prettier/recommended'
        ],
        rules: {
            'vue/multi-word-component-names': 'off',
            'no-unused-vars': 'warn',
            'prefer-const': 'error',
            'no-console': 'warn',
            'no-debugger': 'error',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            ...vuePlugin.configs.recommended.rules
        },
        overrides: [
            {
                files: ['*.vue'],
                rules: {
                    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
                    'vue/component-options-name-casing': ['error', 'PascalCase'],
                    'vue/custom-event-name-casing': ['error', 'camelCase']
                }
            }
        ]
    }
];
