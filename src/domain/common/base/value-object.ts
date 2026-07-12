export abstract class ValueObject {
  protected abstract getEqualityComponents(): readonly unknown[];

  public equals(other: ValueObject): boolean {
    if (other == null) {
      return false;
    }
    if (this.constructor !== other.constructor) {
      return false;
    }
    return this.getEqualityComponents().every(
      (component, index) => component === other.getEqualityComponents()[index],
    );
  }
}
