import Button from "../ui/Button";
import { addMaterial } from "../../services/materialService";

export default function MaterialQuantityControl({ item, refresh }) {
  async function update(delta) {
    const newQty = item.quantity + delta;
    if (newQty < 0) return;
    await materialService.update(item.id, { quantity: newQty });
    refresh();
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Button size="sm" variant="secondary" onClick={() => update(-1)}>
        -
      </Button>
      <div style={{ fontWeight: "600", minWidth: "32px", textAlign: "center" }}>
        {item.quantity}
      </div>
      <Button size="sm" variant="secondary" onClick={() => update(+1)}>
        +
      </Button>
    </div>
  );
}
