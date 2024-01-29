import sql from 'better-sqlite3';
import fs from 'node:fs';
import slugify from 'slugify';
import xss from 'xss';
const db = sql('meals.db');
export async function getMeals() {
    await new Promise((res) => setTimeout(res, 1000));
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    // await new Promise((res)=> setTimeout(res,2000));
    // console.log(slug);
    return db.prepare('SELECT * FROM meals WHERE "slug" =?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferImage), (err) => {
        if (err) {
            throw new Error('Save image failed! ');
        }
    });
    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
         @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug
        )
    `).run({
        title: meal.title,
        summary: meal.summary,
        instructions: meal.instructions,
        creator: meal.creator,
        creator_email: meal.creator_email,
        image: meal.image,
        slug: meal.slug
    });
}
7


