import { useState } from "react";
import IngredientList from "./IngredientList";
import Recipe from "./Recipe";
import getRecipeFromMistral from "../api/ai";
export default function MainForm() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newIngredient = formData.get("ingredient");
    if (newIngredient) {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
    event.target.reset();
  };

  return (
    <div className="main_form_container">
      <form className="main_form" onSubmit={handleSubmit}>
        <input
          className="add_ingredient_input"
          type="text"
          placeholder="e.g. oregano"
          aria-label="add ingredient"
          name="ingredient"
        />
        <button
          className="add_ingredient_button"
          aria-label="submit"
          type="submit"
        >
          + Add ingredient
        </button>
      </form>
      {ingredients.length > 0 && (
        <IngredientList getRecipe={getRecipe} ingredients={ingredients} />
      )}

      {recipe && <Recipe recipe={recipe} />}
    </div>
  );
}
