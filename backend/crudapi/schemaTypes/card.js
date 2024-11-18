// sanity-studio/schemas/card.js

export default {
    name: 'card',
    title: 'Card',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'cardId',
            title: 'Card ID',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,  // Allows image cropping
            },
        },
    ],
}
