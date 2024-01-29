import classes from "./meals-grid.module.css"
import MealItem from "./meal-item"
export default function MealGrid({meals}){
    return <ul className={classes.meals}>
        {meals.map(meal => <li key={meal.id}>
            <li key={meal.id}>
                <MealItem {...meal} />
            </li>
        </li>)}
    </ul>
}