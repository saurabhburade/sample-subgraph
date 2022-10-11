import { ApprovalSchema } from "./../generated/schema";
import { BigInt } from "@graphprotocol/graph-ts";
import {
  UChildERC20Proxy,
  Approval,
  OwnershipTransferred,
  Transfer,
} from "../generated/UChildERC20Proxy/UChildERC20Proxy";

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  // let entity = ExampleEntity.load(event.transaction.from.toHex())
  let approvalEntity = ApprovalSchema.load(event.transaction.from.toHex());
  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (approvalEntity == null) {
    approvalEntity = new ApprovalSchema(event.transaction.from.toHex());
    approvalEntity.spender = event.params.spender;
    approvalEntity.value = event.params.value;
    approvalEntity.amount = event.params.value;
    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0);
  }

  // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1);

  // Entity fields can be set based on event parameters
  // entity.owner = event.params.owner;
  // entity.spender = event.params.spender;

  // Entities can be written to the store with `.save()`
  // entity.save();
  approvalEntity.save();
  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract._decimals(...)
  // - contract._name(...)
  // - contract._symbol(...)
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.burn(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.getOwner(...)
  // - contract.increaseAllowance(...)
  // - contract.mint(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.symbol(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {}
