import { FormGroupDirective } from "@angular/forms";
import { ValidationVisibilityStrategy , ChangeStrategy , SubmitStrategy , ChangeSubmitStrategy , BlurStrategy } from "./strategy";




export type StrategyType = 'submit' | 'changeSubmit' |'change' | 'blur';
export function getValidationStrategy( type: StrategyType,
  ngForm: FormGroupDirective
): ValidationVisibilityStrategy {
  switch (type) {
    case 'submit': return new SubmitStrategy(ngForm);
    case 'changeSubmit': return new ChangeSubmitStrategy(ngForm);
    case 'change': return new ChangeStrategy();
    case 'blur': return new BlurStrategy();
    default: throw new Error(`Unknown validation strategy: ${type}`);
  }
}