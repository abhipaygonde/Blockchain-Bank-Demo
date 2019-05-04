/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

/**
 * Sample transaction processor function.
 * @param {org.example.basic.AccountTransfer} tx The sample transaction instance.
 * @transaction
 */
async function accountTransfer(tx) {  // eslint-disable-line no-unused-vars

   
  if(tx.from.balance < tx.amount)
  {
    throw new Error ('Insufficient Funds!');
  }
  
  /*  // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.example.basic.Account');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.from);

  	await assetRegistry.update(tx.to);
  
    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.example.basic', 'TransferEvent');
    event.from.balance -= event.amount;
   	event.to.balance += event.amount;
    emit(event); 
    */
  tx.from.balance -= tx.amount;
  tx.to.balance += tx.amount;
  
  return getAssetRegistry('org.example.basic.Account')
  .then(function (assetRegistry){
    return assetRegistry.update(tx.from);
  })
  .then(function () {
    return getAssetRegistry('org.example.basic.Account')
  })
  .then(function (assetRegistry){
    return assetRegistry.update(tx.to);
  });
}
