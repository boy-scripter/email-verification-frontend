import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export class CountdownManager {
  private initialValue = signal(0);
  private counter = signal(0);
  private running = signal(false);

  // Reactive state
  readonly timeLeft = computed(() => this.counter());
  readonly isRunning = computed(() => this.running() && this.counter() > 0);

  // Callbacks
  private onTickCb?: (timeLeft: number) => void;
  private onCompleteCb?: () => void;

  private intervalId: ReturnType<typeof setTimeout> | null = null;

  /**
   * Start a countdown
   */
  start(seconds: number) {
    this.stop();
    this.initialValue.set(seconds);
    this.counter.set(seconds);
    this.running.set(true);

    this.intervalId = setInterval(() => {
      if (this.counter() > 0) {
        this.counter.update((v) => {
          const newValue = v - 1;
          if (this.onTickCb) this.onTickCb(newValue);
          return newValue;
        });
      } else {
        this.stop();
        if (this.onCompleteCb) this.onCompleteCb();
      }
    }, 1000);
  }

  /**
   * Reset countdown back to initial value
   */
  reset() {
    this.stop();
    this.counter.set(this.initialValue());
    this.start(this.initialValue());
  }

  /**
   * Stop countdown
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.running.set(false);
  }

  /**
   * Register a tick callback
   */
  onTick(cb: (timeLeft: number) => void) {
    this.onTickCb = cb;
  }

  /**
   * Register a complete callback
   */
  onComplete(cb: () => void) {
    this.onCompleteCb = cb;
  }
}
