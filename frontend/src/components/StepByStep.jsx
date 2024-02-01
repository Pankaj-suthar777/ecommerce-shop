import { Link } from "react-router-dom";

export default function StepByStep({ step }) {
  return (
    <div class="stepper-wrapper">
      <div class={`stepper-item ${step === 1 ? "completed" : ""}`}>
        <div class={`step-counter ${step === 1 ? "text-white" : ""}`}>
          <i class="ri-check-line"></i>
        </div>
        <div class="step-name">Sign In</div>
      </div>

      <div class={`stepper-item ${step > 1 ? "completed" : ""}`}>
        <Link className="link" to="/shipping">
          <div className="flex">
            <div class={`step-counter ${step > 1 ? "text-white" : ""}`}>
              {step > 2 ? <i class="ri-check-line"></i> : "2"}
            </div>
            <div class="step-name">Shipping</div>
          </div>
        </Link>
      </div>

      <div class={`stepper-item ${step > 2 ? "completed" : ""}`}>
        <Link className="link" to="/shipping">
          <div className="flex">
            <div class={`step-counter ${step > 2 ? "text-white" : ""}`}>
              {step > 2 ? <i class="ri-check-line"></i> : "3"}
            </div>
            <div class="step-name text-center">Payment</div>
          </div>
        </Link>
      </div>

      <div class={`stepper-item ${step > 3 ? "completed" : ""}`}>
        <Link className="link" to="/shipping">
          <div className="flex">
            <div class={`step-counter ${step > 3 ? "text-white" : ""}`}>
              {step > 3 ? <i class="ri-check-line"></i> : "3"}
            </div>
            <div class="step-name">Place Order</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
